import express from 'express';
import {
  trackView,
  toggleLike,
  getPropertyAnalytics,
  getOwnerDashboard,
  trackInquiry,
  getLikeStatus,
  getPublicAnalytics
} from '../controllers/analytics.controller.js';
import { verifyToken, authorizeOwnerOrAdmin } from '../utils/VerifyUser.js';

const router = express.Router();

// Public routes (no auth required)
router.post('/view/:listingId', trackView);
router.get('/like-status/:listingId', getLikeStatus);
router.get('/public/:listingId', getPublicAnalytics);

// Protected routes (auth required)
router.post('/like/:listingId', verifyToken, toggleLike);
router.post('/inquiry/:listingId', verifyToken, trackInquiry);

// Owner/Admin routes
router.get('/property/:listingId', verifyToken, getPropertyAnalytics);
router.get('/dashboard', verifyToken, getOwnerDashboard);

export default router;
