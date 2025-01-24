import Listing from "../models/listing.model.js";
import errorHandler from "../utils/error.js";
export const createListing =async (req,res,next)=>{
    try{
          const listing=await Listing.create(req.body)
          return res.status(200).json(listing);
    }catch(err){
        next(err);
    }
}
export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
  
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
  
    if (req.user.id !== listing.useRef) {
      return next(errorHandler(401, 'You can only delete your own listings!'));
    }
  
    try {
      await Listing.findByIdAndDelete(req.params.id);
      res.status(200).json('Listing has been deleted!');
    } catch (error) {
      next(error);
    }
  };
  export const updateListing = async (req, res, next) => {
    const listing=await Listing.findById(req.params.id);
    if(req.user.id!==listing.useRef){
      return next(errorHandler(401, 'You can only update your own listings!'));
    }
    if(!listing){
      return next(errorHandler(404, 'Listing not found!'));
    }
    try{  
        const updatedlisting=await Listing.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatedlisting);
    }catch(err){
        next(err);
    }
  }
  export const getListing = async (req, res, next) => {
    try {
      const listing = await Listing.findById(req.params.id);
      if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
      }
      res.status(200).json(listing);
    } catch (error) {
      next(error);
    }
  };