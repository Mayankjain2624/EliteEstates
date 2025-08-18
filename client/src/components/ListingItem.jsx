// import { Link } from 'react-router-dom';
// import { MdLocationOn } from 'react-icons/md';
import PropTypes from 'prop-types';
import LikeButton from './LikeButton';
import ViewCounter from './ViewCounter';

import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { FaBed, FaBath, FaEye } from 'react-icons/fa';
// import PropTypes from 'prop-types';
// import LikeButton from './LikeButton';
// import ViewCounter from './ViewCounter';

export default function ListingItem({ listing }) {
  return (
    <div className='group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2'>
      <Link to={`/listing/${listing._id}`}>
        <div className='relative overflow-hidden'>
          <img
            src={
              listing.imageUrls[0] ||
              'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
            }
            alt='listing cover'
            className='h-[240px] w-full object-cover group-hover:scale-110 transition-transform duration-700'
          />
          
          {/* Gradient Overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          
          {/* Property Type Badge */}
          <div className='absolute top-4 left-4'>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm ${
              listing.type === 'rent' 
                ? 'bg-green-500/80' 
                : listing.offer 
                  ? 'bg-orange-500/80' 
                  : 'bg-blue-500/80'
            }`}>
              {listing.type === 'rent' ? 'FOR RENT' : listing.offer ? 'SPECIAL OFFER' : 'FOR SALE'}
            </span>
          </div>
          
          {/* Like Button */}
          <div className='absolute top-4 right-4 z-10'>
            <LikeButton listingId={listing._id} />
          </div>
          
          {/* Quick View on Hover */}
          <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
            <div className='bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 text-gray-900 font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
              Quick View
            </div>
          </div>
        </div>
      </Link>

      <Link to={`/listing/${listing._id}`}>
        <div className='p-6'>
          {/* Price */}
          <div className='flex items-center justify-between mb-3'>
            <p className='text-2xl font-black text-gray-900'>
              $
              {listing.offer
                ? listing.discountedPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && (
                <span className='text-sm font-normal text-gray-500'>/month</span>
              )}
            </p>
            {listing.offer && listing.regularPrice > listing.discountedPrice && (
              <div className='text-right'>
                <p className='text-sm text-gray-400 line-through'>
                  ${listing.regularPrice.toLocaleString('en-US')}
                </p>
                <p className='text-xs text-green-600 font-semibold'>
                  Save ${(listing.regularPrice - listing.discountedPrice).toLocaleString('en-US')}
                </p>
              </div>
            )}
          </div>
          
          {/* Title */}
          <h3 className='text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300'>
            {listing.name}
          </h3>
          
          {/* Location */}
          <div className='flex items-center gap-2 mb-3'>
            <MdLocationOn className='h-4 w-4 text-blue-500 flex-shrink-0' />
            <p className='text-sm text-gray-600 truncate'>
              {listing.address}
            </p>
          </div>
          
          {/* Description */}
          <p className='text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed'>
            {listing.description}
          </p>
          
          {/* Property Details */}
          <div className='flex items-center justify-between border-t border-gray-100 pt-4'>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-1 text-gray-600'>
                <FaBed className='text-blue-500' />
                <span className='text-sm font-medium'>
                  {listing.bedrooms} {listing.bedrooms === 1 ? 'Bed' : 'Beds'}
                </span>
              </div>
              <div className='flex items-center gap-1 text-gray-600'>
                <FaBath className='text-blue-500' />
                <span className='text-sm font-medium'>
                  {listing.bathrooms} {listing.bathrooms === 1 ? 'Bath' : 'Baths'}
                </span>
              </div>
            </div>
            
            {/* View Counter */}
            <div className='flex items-center gap-1 text-gray-500'>
              <FaEye className='text-xs' />
              <ViewCounter listingId={listing._id} size="small" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

ListingItem.propTypes = {
  listing: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    offer: PropTypes.bool.isRequired,
    discountedPrice: PropTypes.number,
    regularPrice: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
  }).isRequired,
};