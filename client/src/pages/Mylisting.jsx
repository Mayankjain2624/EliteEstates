import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
function Mylisting() {
  const { currentUser } = useSelector((state) => state.user);
  const [Listings, setListings] = useState([]);
  const showlisting = async () => {
    try {
      const res = await fetch(`/api/user/listings/${currentUser._id}`,
        {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify()
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setListings(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    showlisting();
  }, []);
  const deleteListing = async (listingId) => {
      try {
        const res = await fetch(`/api/listing/delete/${listingId}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
  
        setListings((prev) =>
          prev.filter((listing) => listing._id !== listingId)
        );
      } catch (error) {
        console.log(error.message);
      }
    };
    const editlisting = async (listingId) => {
      try{
        const res=await fetch(`/api/listing/update/${listingId}`,
          {
          method:'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify()
        });
        const data=await res.json();
        console.log(data);
      }catch(err){
        console.log(err);
      }
    }
  return (
    <div className="flex flex-wrap justify-center items-center">

      {Listings.map(listing => (
          <div key={listing._id} className="max-w-sm bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden m-4 hover:shadow-xl transition-shadow duration-300">
            <img 
              src={listing.imageUrls[0] || 'https://via.placeholder.com/400'} 
              alt={listing.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h1 className="text-xl font-semibold text-gray-800 mb-3">{listing.name}</h1>
              <p className="text-gray-600 mb-4 text-sm line-clamp-3">{listing.description}</p>
              <div className="mb-4">
                <p className="text-lg font-bold text-green-600">${listing.discountedPrice || listing.regularPrice}</p>
                {listing.discountedPrice && (
                  <p className="text-sm text-gray-500 line-through">${listing.regularPrice}</p>
                )}
              </div>
              <p className="text-gray-500 text-sm mb-4">Location: {listing.address}</p>
              <div className="flex justify-between space-x-2">
                <button 
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                  onClick={()=>editlisting(listing._id)}
                >
                  Edit
                </button>
                <button 
                  className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                  onClick={()=>deleteListing(listing._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
      ))}
    </div>
  )
}

export default Mylisting
