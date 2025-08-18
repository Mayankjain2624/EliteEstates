import express from 'express'
import { 
    deleteUser, 
    test, 
    updateUser, 
    getUSerListings, 
    getUser, 
    getAllUsers, 
    getAllListings, 
    updateUserRole 
} from '../controllers/user.controller.js';
import { deleteListing } from '../controllers/listing.controller.js';
import { verifyToken, authorizeRoles, authorizeOwnerOrAdmin } from '../utils/VerifyUser.js';

const router=express.Router();

router.get('/test',test);

// User profile management (users can manage their own, admin can manage any)
router.post('/update/:id', verifyToken, authorizeOwnerOrAdmin, updateUser)
router.delete('/delete/:id', verifyToken, authorizeOwnerOrAdmin, deleteUser)
router.get('/listings/:id', verifyToken, getUSerListings)
router.get('/:id', verifyToken, getUser)

// Admin only routes
router.get('/admin/users', verifyToken, authorizeRoles('admin'), getAllUsers);
router.get('/admin/listings', verifyToken, authorizeRoles('admin'), getAllListings);
router.put('/admin/users/:id/role', verifyToken, authorizeRoles('admin'), updateUserRole);
router.delete('/admin/users/:id', verifyToken, authorizeRoles('admin'), deleteUser);
router.delete('/admin/listings/:id', verifyToken, authorizeRoles('admin'), deleteListing);

export default router;