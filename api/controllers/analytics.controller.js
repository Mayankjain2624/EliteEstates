import PropertyAnalytics from '../models/propertyAnalytics.model.js';
import Listing from '../models/listing.model.js';
import errorHandler from '../utils/error.js';

// Track property view
export const trackView = async (req, res, next) => {
  try {
    const { listingId } = req.params;
    const userId = req.user ? req.user._id : null;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    let analytics = await PropertyAnalytics.findOne({ listingId });
    
    if (!analytics) {
      analytics = new PropertyAnalytics({
        listingId,
        views: 1,
        viewHistory: [{
          userId,
          ipAddress,
          userAgent,
        }]
      });
    } else {
      analytics.views += 1;
      analytics.viewHistory.push({
        userId,
        ipAddress,
        userAgent,
      });
    }

    await analytics.save();
    
    res.status(200).json({
      success: true,
      message: 'View tracked successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Toggle like on property
export const toggleLike = async (req, res, next) => {
  try {
    const { listingId } = req.params;
    const userId = req.user._id;

    // Check if listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found'));
    }

    let analytics = await PropertyAnalytics.findOne({ listingId });
    
    if (!analytics) {
      analytics = new PropertyAnalytics({
        listingId,
        likes: [{ userId }],
        totalLikes: 1,
      });
      await analytics.save();
      
      return res.status(200).json({
        success: true,
        liked: true,
        totalLikes: 1,
        message: 'Property liked successfully'
      });
    }

    const existingLike = analytics.likes.find(like => like.userId.toString() === userId.toString());
    
    if (existingLike) {
      // Remove like
      analytics.likes = analytics.likes.filter(like => like.userId.toString() !== userId.toString());
      analytics.totalLikes = Math.max(0, analytics.totalLikes - 1);
      await analytics.save();
      
      return res.status(200).json({
        success: true,
        liked: false,
        totalLikes: analytics.totalLikes,
        message: 'Property unliked successfully'
      });
    } else {
      // Add like
      analytics.likes.push({ userId });
      analytics.totalLikes += 1;
      await analytics.save();
      
      return res.status(200).json({
        success: true,
        liked: true,
        totalLikes: analytics.totalLikes,
        message: 'Property liked successfully'
      });
    }
  } catch (error) {
    next(error);
  }
};

// Get property analytics for owners
export const getPropertyAnalytics = async (req, res, next) => {
  try {
    const { listingId } = req.params;
    const userId = req.user._id;

    // Check if user owns the listing or is admin
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found'));
    }

    if (listing.useRef.toString() !== userId.toString() && req.user.role !== 'admin') {
      return next(errorHandler(403, 'You can only view analytics for your own properties'));
    }

    const analytics = await PropertyAnalytics.findOne({ listingId })
      .populate('likes.userId', 'username avatar')
      .populate('viewHistory.userId', 'username avatar')
      .populate('inquiries.userId', 'username avatar email');

    if (!analytics) {
      return res.status(200).json({
        success: true,
        analytics: {
          views: 0,
          totalLikes: 0,
          likes: [],
          viewHistory: [],
          inquiries: [],
        }
      });
    }

    res.status(200).json({
      success: true,
      analytics
    });
  } catch (error) {
    next(error);
  }
};

// Get dashboard analytics for property owner
export const getOwnerDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Get all listings for the user
    const listings = await Listing.find({ useRef: userId });
    const listingIds = listings.map(listing => listing._id);

    // Get analytics for all user's listings
    const analyticsData = await PropertyAnalytics.find({ 
      listingId: { $in: listingIds } 
    }).populate('listingId', 'name address imageUrls regularPrice type');

    // Calculate aggregate statistics
    const totalViews = analyticsData.reduce((sum, analytics) => sum + analytics.views, 0);
    const totalLikes = analyticsData.reduce((sum, analytics) => sum + analytics.totalLikes, 0);
    const totalInquiries = analyticsData.reduce((sum, analytics) => sum + analytics.inquiries.length, 0);

    // Get recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentViews = analyticsData.reduce((sum, analytics) => {
      const recentViewCount = analytics.viewHistory.filter(
        view => view.viewedAt >= thirtyDaysAgo
      ).length;
      return sum + recentViewCount;
    }, 0);

    const recentLikes = analyticsData.reduce((sum, analytics) => {
      const recentLikeCount = analytics.likes.filter(
        like => like.likedAt >= thirtyDaysAgo
      ).length;
      return sum + recentLikeCount;
    }, 0);

    // Get daily view data for the last 30 days
    const dailyViews = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));

      const dayViews = analyticsData.reduce((sum, analytics) => {
        const dayViewCount = analytics.viewHistory.filter(
          view => view.viewedAt >= startOfDay && view.viewedAt <= endOfDay
        ).length;
        return sum + dayViewCount;
      }, 0);

      dailyViews.push({
        date: startOfDay.toISOString().split('T')[0],
        views: dayViews
      });
    }

    // Top performing properties
    const topProperties = analyticsData
      .sort((a, b) => b.views - a.views)
      .slice(0, 5)
      .map(analytics => ({
        listing: analytics.listingId,
        views: analytics.views,
        likes: analytics.totalLikes,
        inquiries: analytics.inquiries.length
      }));

    res.status(200).json({
      success: true,
      dashboard: {
        overview: {
          totalProperties: listings.length,
          totalViews,
          totalLikes,
          totalInquiries,
          recentViews,
          recentLikes
        },
        dailyViews,
        topProperties,
        analyticsData: analyticsData.map(analytics => ({
          listingId: analytics.listingId._id,
          listingName: analytics.listingId.name,
          listingImage: analytics.listingId.imageUrls[0],
          views: analytics.views,
          likes: analytics.totalLikes,
          inquiries: analytics.inquiries.length,
          lastViewed: analytics.viewHistory.length > 0 
            ? analytics.viewHistory[analytics.viewHistory.length - 1].viewedAt 
            : null
        }))
      }
    });
  } catch (error) {
    next(error);
  }
};

// Track inquiry
export const trackInquiry = async (req, res, next) => {
  try {
    const { listingId } = req.params;
    const { inquiryType } = req.body;
    const userId = req.user._id;

    let analytics = await PropertyAnalytics.findOne({ listingId });
    
    if (!analytics) {
      analytics = new PropertyAnalytics({
        listingId,
        inquiries: [{ userId, inquiryType }]
      });
    } else {
      analytics.inquiries.push({ userId, inquiryType });
    }

    await analytics.save();
    
    res.status(200).json({
      success: true,
      message: 'Inquiry tracked successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get like status for a property
export const getLikeStatus = async (req, res, next) => {
  try {
    const { listingId } = req.params;
    const userId = req.user ? req.user._id : null;

    if (!userId) {
      return res.status(200).json({
        success: true,
        liked: false,
        totalLikes: 0
      });
    }

    const analytics = await PropertyAnalytics.findOne({ listingId });
    
    if (!analytics) {
      return res.status(200).json({
        success: true,
        liked: false,
        totalLikes: 0
      });
    }

    const isLiked = analytics.likes.some(like => like.userId.toString() === userId.toString());
    
    res.status(200).json({
      success: true,
      liked: isLiked,
      totalLikes: analytics.totalLikes
    });
  } catch (error) {
    next(error);
  }
};

// Get public analytics (view count, total likes) - accessible to all users
export const getPublicAnalytics = async (req, res, next) => {
  try {
    const { listingId } = req.params;

    const analytics = await PropertyAnalytics.findOne({ listingId });
    
    if (!analytics) {
      return res.status(200).json({
        success: true,
        analytics: {
          views: 0,
          totalLikes: 0,
          viewHistory: [],
        }
      });
    }

    // Return only public data (no detailed user information)
    const publicData = {
      views: analytics.views || 0,
      totalLikes: analytics.totalLikes || analytics.likes.length || 0,
      viewHistory: analytics.viewHistory.map(view => ({
        viewedAt: view.viewedAt,
        // Remove sensitive user data
      })).slice(-50) // Only last 50 views for performance
    };

    res.status(200).json({
      success: true,
      analytics: publicData
    });
  } catch (error) {
    next(error);
  }
};
