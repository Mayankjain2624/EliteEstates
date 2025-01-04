import errorHandler from '../utils/error.js'
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js';

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