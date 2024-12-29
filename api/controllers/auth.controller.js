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

export const signin = async (req, res, next) => {
   const { username, password } = req.body;
   try {
      const validUser = await User.findOne({ username: username });
      if (!validUser)
         return next(errorHandler(404, 'user not found'));
      // console.log(validUser.password);

      const validPassword = await bcrypt.compare(password, validUser.password);
      // console.log(validPassword)
      if (!validPassword)
         return next(errorHandler(404, 'Wrong credentials'));
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...restInfo } = validUser._doc;
      res
         .cookie('access_token', token, { httpOnly: true })
         .status(200).json(restInfo);
   }
   catch (err) {
      next(err);
   }
}

export const googlesignin = async (req, res, next) => {
   try {
      const { name, email, photoURL } = req.body;
      const finalName = name.split(" ").join("").toLowerCase();
      const user = await User.findOne({ username: finalName });
      if (user) {
         console.log("user mil gaya")
         const token = jwt.sign({ id: user._id },process.env.JWT_SECRET);
         const { password: pass, ...restInfo } = user._doc;
         res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(restInfo);
      }
      else {
         //in usermodel we have declared password required but google does not provide any password so we have to create some random password and then give user chance to update password
         const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
         const hashedPassword = bcrypt.hashSync(generatePassword, 10);
         const newUser = new User({ username: finalName, email: email, password: hashedPassword, avatar: photoURL });
         await newUser.save();
         const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
         const { password: pass, ...restInfo } = newUser._doc;
         res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(restInfo);
      }
   }
   catch (err) {
      next(err);
   }
}