
import errorHandler from "./error.js";
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401, 'Unauthorized'));
    }    
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) { 
            return next(errorHandler(403, 'Forbidden'));
        }
        
        try {
            // Get full user info including role
            const user = await User.findById(decoded.id).select('-password');
            if (!user) {
                return next(errorHandler(404, 'User not found'));
            }
            
            req.user = user;
            next();
        } catch (error) {
            return next(errorHandler(500, 'Server error'));
        }
    });
}

export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(errorHandler(401, 'Authentication required'));
        }
        
        if (!allowedRoles.includes(req.user.role)) {
            return next(errorHandler(403, `Access denied. Required roles: ${allowedRoles.join(', ')}`));
        }
        
        next();
    };
}

// Middleware to check if user owns the resource or is admin
export const authorizeOwnerOrAdmin = (req, res, next) => {
    if (!req.user) {
        return next(errorHandler(401, 'Authentication required'));
    }
    
    // Admin can access everything
    if (req.user.role === 'admin') {
        return next();
    }
    
    // Check if user owns the resource (for user ID in params)
    if (req.params.id && req.user._id.toString() === req.params.id) {
        return next();
    }
    
    return next(errorHandler(403, 'Access denied. You can only access your own resources.'));
}