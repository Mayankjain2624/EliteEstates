import TourBooking from '../models/tourBooking.model.js';
import Listing from '../models/listing.model.js';
import User from '../models/user.model.js';
import PropertyAnalytics from '../models/propertyAnalytics.model.js';
import errorHandler from '../utils/error.js';

// Create a new tour booking request
export const createTourBooking = async (req, res, next) => {
  try {
    const { listingId } = req.params;
    const userId = req.user._id;
    const {
      tourType,
      requestedDate,
      requestedTime,
      userInfo,
      specialRequests
    } = req.body;

    // Validate listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found'));
    }

    // Check if user is trying to book their own property
    if (listing.useRef.toString() === userId.toString()) {
      return next(errorHandler(400, 'You cannot book a tour for your own property'));
    }

    // Validate date is in the future
    const tourDate = new Date(requestedDate);
    const now = new Date();
    if (tourDate < now) {
      return next(errorHandler(400, 'Tour date must be in the future'));
    }

    // Check for existing pending/confirmed bookings for same user and property
    const existingBooking = await TourBooking.findOne({
      listingId,
      userId,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingBooking) {
      return next(errorHandler(400, 'You already have a pending or confirmed tour for this property'));
    }

    // Create tour booking
    const tourBooking = new TourBooking({
      listingId,
      userId,
      ownerId: listing.useRef,
      tourType,
      requestedDate: tourDate,
      requestedTime,
      userInfo,
      specialRequests
    });

    await tourBooking.save();

    // Track tour booking in analytics
    try {
      await PropertyAnalytics.findOneAndUpdate(
        { listingId },
        {
          $push: {
            inquiries: {
              userId,
              inquiryType: 'tour_request',
              message: `Tour booking request - ${tourType} tour`,
              contactInfo: userInfo.email
            }
          }
        },
        { upsert: true }
      );
    } catch (analyticsError) {
      console.log('Analytics tracking error:', analyticsError);
    }

    // Populate the booking with user and listing details
    const populatedBooking = await TourBooking.findById(tourBooking._id)
      .populate('userId', 'username email avatar')
      .populate('listingId', 'name address imageUrls')
      .populate('ownerId', 'username email');

    res.status(201).json({
      success: true,
      message: 'Tour booking request created successfully',
      booking: populatedBooking
    });
  } catch (error) {
    next(error);
  }
};

// Get tour bookings for a user
export const getUserTourBookings = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { status, limit = 10, page = 1 } = req.query;

    const filter = { userId };
    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;

    const bookings = await TourBooking.find(filter)
      .populate('listingId', 'name address imageUrls regularPrice type')
      .populate('ownerId', 'username email phone')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await TourBooking.countDocuments(filter);

    res.status(200).json({
      success: true,
      bookings,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        count: bookings.length,
        totalBookings: total
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get tour bookings for property owner
export const getOwnerTourBookings = async (req, res, next) => {
  try {
    const ownerId = req.user._id;
    const { status, limit = 10, page = 1 } = req.query;

    const filter = { ownerId };
    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;

    const bookings = await TourBooking.find(filter)
      .populate('userId', 'username email phone avatar')
      .populate('listingId', 'name address imageUrls regularPrice type')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await TourBooking.countDocuments(filter);

    // Get status counts for dashboard
    const statusCounts = await TourBooking.aggregate([
      { $match: { ownerId: ownerId } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const statusStats = statusCounts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      bookings,
      statusStats,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        count: bookings.length,
        totalBookings: total
      }
    });
  } catch (error) {
    next(error);
  }
};

// Owner response to tour booking (confirm/cancel/reschedule)
export const respondToTourBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const ownerId = req.user._id;
    const { action, message, rescheduleOptions, meetingLink } = req.body;

    const booking = await TourBooking.findById(bookingId);
    if (!booking) {
      return next(errorHandler(404, 'Tour booking not found'));
    }

    // Verify owner
    if (booking.ownerId.toString() !== ownerId.toString()) {
      return next(errorHandler(403, 'You can only respond to your own property tour requests'));
    }

    // Validate current status
    if (!['pending', 'rescheduled'].includes(booking.status)) {
      return next(errorHandler(400, 'Can only respond to pending or rescheduled bookings'));
    }

    const updateData = {
      'ownerResponse.message': message,
      'ownerResponse.respondedAt': new Date()
    };

    switch (action) {
      case 'confirm':
        updateData.status = 'confirmed';
        updateData.confirmedDate = booking.requestedDate;
        updateData.confirmedTime = booking.requestedTime;
        if (booking.tourType === 'virtual' && meetingLink) {
          updateData.meetingLink = meetingLink;
        }
        break;

      case 'cancel':
        updateData.status = 'cancelled';
        updateData.cancelReason = message;
        break;

      case 'reschedule':
        if (!rescheduleOptions || !Array.isArray(rescheduleOptions) || rescheduleOptions.length === 0) {
          return next(errorHandler(400, 'Reschedule options are required'));
        }
        updateData.status = 'rescheduled';
        updateData['ownerResponse.rescheduleOptions'] = rescheduleOptions.map(option => ({
          date: new Date(option.date),
          time: option.time,
          isAvailable: true
        }));
        break;

      default:
        return next(errorHandler(400, 'Invalid action. Must be confirm, cancel, or reschedule'));
    }

    const updatedBooking = await TourBooking.findByIdAndUpdate(
      bookingId,
      { $set: updateData },
      { new: true }
    ).populate('userId', 'username email phone')
     .populate('listingId', 'name address imageUrls');

    res.status(200).json({
      success: true,
      message: `Tour booking ${action}ed successfully`,
      booking: updatedBooking
    });
  } catch (error) {
    next(error);
  }
};

// User response to reschedule options
export const respondToReschedule = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user._id;
    const { selectedDate, selectedTime, action } = req.body;

    const booking = await TourBooking.findById(bookingId);
    if (!booking) {
      return next(errorHandler(404, 'Tour booking not found'));
    }

    // Verify user
    if (booking.userId.toString() !== userId.toString()) {
      return next(errorHandler(403, 'You can only respond to your own tour bookings'));
    }

    // Validate current status
    if (booking.status !== 'rescheduled') {
      return next(errorHandler(400, 'This booking is not in reschedule state'));
    }

    if (action === 'accept') {
      // Validate selected option exists and is available
      const selectedOption = booking.ownerResponse.rescheduleOptions.find(
        option => 
          option.date.toISOString().split('T')[0] === new Date(selectedDate).toISOString().split('T')[0] &&
          option.time === selectedTime &&
          option.isAvailable
      );

      if (!selectedOption) {
        return next(errorHandler(400, 'Invalid or unavailable reschedule option selected'));
      }

      // Add to rescheduling history
      const historyEntry = {
        requestedBy: 'owner',
        previousDate: booking.requestedDate,
        previousTime: booking.requestedTime,
        newDate: new Date(selectedDate),
        newTime: selectedTime,
        reason: 'Owner requested reschedule'
      };

      const updatedBooking = await TourBooking.findByIdAndUpdate(
        bookingId,
        {
          $set: {
            status: 'confirmed',
            requestedDate: new Date(selectedDate),
            requestedTime: selectedTime,
            confirmedDate: new Date(selectedDate),
            confirmedTime: selectedTime
          },
          $push: {
            reschedulingHistory: historyEntry
          }
        },
        { new: true }
      ).populate('userId', 'username email')
       .populate('listingId', 'name address imageUrls')
       .populate('ownerId', 'username email');

      res.status(200).json({
        success: true,
        message: 'Reschedule accepted and tour confirmed',
        booking: updatedBooking
      });
    } else if (action === 'decline') {
      const updatedBooking = await TourBooking.findByIdAndUpdate(
        bookingId,
        { 
          $set: { 
            status: 'cancelled',
            cancelReason: 'User declined reschedule options'
          }
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: 'Reschedule declined and tour cancelled',
        booking: updatedBooking
      });
    } else {
      return next(errorHandler(400, 'Invalid action. Must be accept or decline'));
    }
  } catch (error) {
    next(error);
  }
};

// Get tour booking details
export const getTourBookingDetails = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user._id;

    const booking = await TourBooking.findById(bookingId)
      .populate('userId', 'username email phone avatar')
      .populate('listingId', 'name address imageUrls regularPrice type description')
      .populate('ownerId', 'username email phone');

    if (!booking) {
      return next(errorHandler(404, 'Tour booking not found'));
    }

    // Check if user has permission to view this booking
    const isOwner = booking.ownerId._id.toString() === userId.toString();
    const isBookingUser = booking.userId._id.toString() === userId.toString();

    if (!isOwner && !isBookingUser) {
      return next(errorHandler(403, 'You do not have permission to view this booking'));
    }

    res.status(200).json({
      success: true,
      booking,
      userRole: isOwner ? 'owner' : 'user'
    });
  } catch (error) {
    next(error);
  }
};

// Mark tour as complete (owner only)
export const markTourComplete = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const ownerId = req.user._id;
    const { notes } = req.body;

    const booking = await TourBooking.findById(bookingId);
    if (!booking) {
      return next(errorHandler(404, 'Tour booking not found'));
    }

    // Verify owner
    if (booking.ownerId.toString() !== ownerId.toString()) {
      return next(errorHandler(403, 'You can only mark your own property tours as complete'));
    }

    // Validate current status - can only mark confirmed tours as complete
    if (booking.status !== 'confirmed') {
      return next(errorHandler(400, 'Can only mark confirmed tours as complete'));
    }

    const updatedBooking = await TourBooking.findByIdAndUpdate(
      bookingId,
      {
        status: 'completed',
        completedAt: new Date(),
        completionNotes: notes || 'Tour completed successfully'
      },
      { new: true }
    ).populate([
      { path: 'userId', select: 'username email' },
      { path: 'listingId', select: 'title address images' },
      { path: 'ownerId', select: 'username email' }
    ]);

    res.status(200).json({
      success: true,
      message: 'Tour marked as completed successfully',
      booking: updatedBooking
    });

  } catch (error) {
    next(error);
  }
};

// Cancel tour booking
export const cancelTourBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user._id;
    const { reason } = req.body;

    const booking = await TourBooking.findById(bookingId);
    if (!booking) {
      return next(errorHandler(404, 'Tour booking not found'));
    }

    // Check if user has permission to cancel
    const isOwner = booking.ownerId.toString() === userId.toString();
    const isBookingUser = booking.userId.toString() === userId.toString();

    if (!isOwner && !isBookingUser) {
      return next(errorHandler(403, 'You do not have permission to cancel this booking'));
    }

    // Check if booking can be cancelled
    if (['cancelled', 'completed'].includes(booking.status)) {
      return next(errorHandler(400, 'This booking cannot be cancelled'));
    }

    const updatedBooking = await TourBooking.findByIdAndUpdate(
      bookingId,
      { 
        $set: { 
          status: 'cancelled',
          cancelReason: reason || 'Cancelled by user'
        }
      },
      { new: true }
    ).populate('userId', 'username email')
     .populate('listingId', 'name address imageUrls')
     .populate('ownerId', 'username email');

    res.status(200).json({
      success: true,
      message: 'Tour booking cancelled successfully',
      booking: updatedBooking
    });
  } catch (error) {
    next(error);
  }
};

// Submit tour feedback
export const submitTourFeedback = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user._id;
    const { rating, comment } = req.body;

    const booking = await TourBooking.findById(bookingId);
    if (!booking) {
      return next(errorHandler(404, 'Tour booking not found'));
    }

    // Verify user is the one who booked the tour
    if (booking.userId.toString() !== userId.toString()) {
      return next(errorHandler(403, 'You can only submit feedback for your own bookings'));
    }

    // Check if tour is completed
    if (booking.status !== 'completed') {
      return next(errorHandler(400, 'You can only submit feedback for completed tours'));
    }

    const updatedBooking = await TourBooking.findByIdAndUpdate(
      bookingId,
      {
        $set: {
          'feedback.rating': rating,
          'feedback.comment': comment,
          'feedback.submittedAt': new Date()
        }
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Feedback submitted successfully',
      booking: updatedBooking
    });
  } catch (error) {
    next(error);
  }
};

// Get dashboard stats for tours
export const getTourDashboardStats = async (req, res, next) => {
  try {
    const ownerId = req.user._id;

    // Get tour booking statistics
    const stats = await TourBooking.aggregate([
      { $match: { ownerId: ownerId } },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          pendingBookings: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },
          confirmedBookings: {
            $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] }
          },
          completedBookings: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          cancelledBookings: {
            $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
          },
          virtualTours: {
            $sum: { $cond: [{ $eq: ['$tourType', 'virtual'] }, 1, 0] }
          },
          physicalTours: {
            $sum: { $cond: [{ $eq: ['$tourType', 'physical'] }, 1, 0] }
          }
        }
      }
    ]);

    const dashboardStats = stats[0] || {
      totalBookings: 0,
      pendingBookings: 0,
      confirmedBookings: 0,
      completedBookings: 0,
      cancelledBookings: 0,
      virtualTours: 0,
      physicalTours: 0
    };

    // Get recent bookings
    const recentBookings = await TourBooking.find({ ownerId })
      .populate('userId', 'username avatar')
      .populate('listingId', 'name address imageUrls')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      stats: dashboardStats,
      recentBookings
    });
  } catch (error) {
    next(error);
  }
};
