import express from 'express';
import {
  createTourBooking,
  getUserTourBookings,
  getOwnerTourBookings,
  respondToTourBooking,
  respondToReschedule,
  getTourBookingDetails,
  cancelTourBooking,
  submitTourFeedback,
  getTourDashboardStats,
  markTourComplete
} from '../controllers/tourBooking.controller.js';
import { verifyToken } from '../utils/VerifyUser.js';

const router = express.Router();

// User routes (authenticated)
router.post('/book/:listingId', verifyToken, createTourBooking);
router.get('/user/bookings', verifyToken, getUserTourBookings);
router.post('/reschedule-response/:bookingId', verifyToken, respondToReschedule);
router.post('/feedback/:bookingId', verifyToken, submitTourFeedback);

// Owner routes (authenticated)
router.get('/owner/bookings', verifyToken, getOwnerTourBookings);
router.post('/owner/respond/:bookingId', verifyToken, respondToTourBooking);
router.post('/owner/complete/:bookingId', verifyToken, markTourComplete);
router.get('/owner/dashboard-stats', verifyToken, getTourDashboardStats);

// Shared routes (authenticated)
router.get('/details/:bookingId', verifyToken, getTourBookingDetails);
router.post('/cancel/:bookingId', verifyToken, cancelTourBooking);

export default router;
