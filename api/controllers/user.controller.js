import errorHandler from '../utils/error.js'
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js';
import Listing from '../models/listing.model.js';
export const test = (req, res) => {
    res.json({
        "message": "api route is working"
    })
}
export const updateUser = async (req, res, next) => {
    // Admin can update any user, users can only update their own account
    if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id)
        return next(errorHandler(401, 'you can update only your account'))
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        
        // Build update object
        const updateData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
        };
        
        // Only admin can change user roles
        if (req.user.role === 'admin' && req.body.role) {
            updateData.role = req.body.role;
        }
        
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: updateData
        }, { new: true })
        
        const {password,...otherInfo}=updatedUser._doc
        res.status(200).json(otherInfo);
        }catch(err){
        next(err)
    }

}
export const  deleteUser= async(req,res,next)=>{
    // Admin can delete any user, users can only delete their own account
    if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id)
        return next(errorHandler(401, 'you can delete only your account'))
    try{
         await User.findByIdAndDelete(req.params.id);
         res.clearCookie('access_token');
         res.status(200).json('User has been deleted');
    }catch(err){
        next(err);
    }
}
export const getUSerListings=async(req,res,next)=>{
       // Admin can view any user's listings, users can only view their own
       if(req.user.role === 'admin' || req.user._id.toString() === req.params.id){
         try{
            const listings=await Listing.find({useRef:req.params.id});
            res.status(200).json(listings);
         }catch(error){
            next(error)
       }
    }
       else{                  
          return next(errorHandler(401, 'you can view only your listings'));

      }
}
export const getUser = async (req, res, next) => {
    try {
      
      const user = await User.findById(req.params.id);
    
      if (!user) return next(errorHandler(404, 'User not found!'));
    
      const { password: pass, ...rest } = user._doc;
    
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };

// Admin only endpoints
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getAllListings = async (req, res, next) => {
  try {
    const listings = await Listing.find().populate('useRef', 'username email');
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    
    if (!['user', 'owner', 'admin'].includes(role)) {
      return next(errorHandler(400, 'Invalid role'));
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');
    
    if (!updatedUser) {
      return next(errorHandler(404, 'User not found'));
    }
    
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};