import Listing from "../models/listing.model.js";
import errorHandler from "../utils/error.js";
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body)
    return res.status(200).json(listing);
  } catch (err) {
    next(err);
  }
}
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  // Admin can delete any listing, owners can only delete their own
  if (req.user.role !== 'admin' && req.user._id.toString() !== listing.useRef) {
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
  const listing = await Listing.findById(req.params.id);
  
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  
  // Admin can update any listing, owners can only update their own
  if (req.user.role !== 'admin' && req.user._id.toString() !== listing.useRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }
  
  try {
    const updatedlisting = await Listing.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedlisting);
  } catch (err) {
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
export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    
    let offer = req.query.offer;
    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }
    
    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }
    
    let parking = req.query.parking;
    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }
    
    let type = req.query.type;
    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }
    
    const searchTerm = req.query.searchTerm || '';
    const location = req.query.location || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';
    
    // Build the search query
    let searchQuery = {
      offer,
      furnished,
      parking,
      type,
    };
    
    // Add name search if searchTerm is provided
    if (searchTerm) {
      searchQuery.name = { $regex: searchTerm, $options: 'i' };
    }
    
    // Add location search if location is provided
    if (location) {
      searchQuery.address = { $regex: location, $options: 'i' };
    }
    
    // Add price range filters
    if (req.query.minPrice || req.query.maxPrice) {
      searchQuery.regularPrice = {};
      if (req.query.minPrice) {
        searchQuery.regularPrice.$gte = parseInt(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        searchQuery.regularPrice.$lte = parseInt(req.query.maxPrice);
      }
    }
    
    // Add bedrooms filter
    if (req.query.bedrooms) {
      searchQuery.bedrooms = { $gte: parseInt(req.query.bedrooms) };
    }
    
    // Add bathrooms filter
    if (req.query.bathrooms) {
      searchQuery.bathrooms = { $gte: parseInt(req.query.bathrooms) };
    }
    
    const listings = await Listing.find(searchQuery)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
      
    res.status(200).json(listings);
  } catch (err) {
    next(err);
  }
}
