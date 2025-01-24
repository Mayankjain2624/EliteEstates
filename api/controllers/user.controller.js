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
    // console.log("request aat backend:",req);
    if (req.user.id !== req.params.id)
        return next(errorHandler(401, 'you can update only your account'))
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, { new: true })
        const {password,...otherInfo}=updatedUser._doc
        res.status(200).json(otherInfo);
        }catch(err){
        next(err)
    }

}
export const  deleteUser= async(req,res,next)=>{
    if (req.user.id !== req.params.id)
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
       if(req.user.id===req.params.id){
         try{
            const listings=await Listing.find({useRef:req.params.id});
            res.status(210).json(listings);
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