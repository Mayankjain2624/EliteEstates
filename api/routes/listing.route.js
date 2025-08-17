import express from  'express'
import { createListing,deleteListing,updateListing,getListing,getListings } from '../controllers/listing.controller.js';
import { verifyToken, authorizeRoles } from '../utils/VerifyUser.js';
const router=express.Router();

// Only owners and admins can create listings
router.post('/create', verifyToken, authorizeRoles('owner', 'admin'), createListing);

// Only owners can delete/update their own listings, admins can delete/update any
router.delete('/delete/:id', verifyToken, authorizeRoles('owner', 'admin'), deleteListing);
router.post('/update/:id', verifyToken, authorizeRoles('owner', 'admin'), updateListing);

// Anyone can view listings
router.get('/get/:id', getListing);
router.get('/get', getListings);

export default router;