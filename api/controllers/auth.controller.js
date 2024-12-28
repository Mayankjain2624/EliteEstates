import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import errorHandler from '../utils/error.js';
import jwt from 'jsonwebtoken'
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
   
  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (err) {
    // Ignore specific error checks and always return the same custom error
    next(err);
  }
};

export const signin=async (req,res,next)=>{
   const { username, password } = req.body;

try{
   const validUser=await User.findOne({'username': username});
   if(!validUser)
      return next(errorHandler(404,'user not found'));
       const validPassword=bcrypt.compare(password,validUser.password);
    if(!validPassword) 
      return next(errorHandler(404,'Wrong credentials'));
   const token=jwt.sign({id: validUser._id},process.env.JWT_SECRET);
   const {password :pass ,...restInfo}=validUser._doc;
   res.cookie('access_token',token,{httpOnly: true}).status(200).json(restInfo);             
}
catch(err){
   next(err);
}
}