import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import { 
  FaSearch, 
  FaFilter, 
  FaSort, 
  FaHome, 
  FaCar, 
  FaCouch, 
  FaTag, 
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaDollarSign,
  FaTh,
  FaList,
  FaTimes
} from 'react-icons/fa';

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'createdAt',
    order: 'desc',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    location: '',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Count active filters
  useEffect(() => {
    let count = 0;
    if (sidebardata.searchTerm) count++;
    if (sidebardata.type !== 'all') count++;
    if (sidebardata.parking) count++;
    if (sidebardata.furnished) count++;
    if (sidebardata.offer) count++;
    if (sidebardata.minPrice) count++;
    if (sidebardata.maxPrice) count++;
    if (sidebardata.bedrooms) count++;
    if (sidebardata.bathrooms) count++;
    if (sidebardata.location) count++;
    setActiveFiltersCount(count);
  }, [sidebardata]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');
    const minPriceFromUrl = urlParams.get('minPrice');
    const maxPriceFromUrl = urlParams.get('maxPrice');
    const bedroomsFromUrl = urlParams.get('bedrooms');
    const bathroomsFromUrl = urlParams.get('bathrooms');
    const locationFromUrl = urlParams.get('location');

    // Update sidebar data with URL parameters
    setSidebardata({
      searchTerm: searchTermFromUrl || '',
      type: typeFromUrl || 'all',
      parking: parkingFromUrl === 'true',
      furnished: furnishedFromUrl === 'true',
      offer: offerFromUrl === 'true',
      sort: sortFromUrl || 'createdAt',
      order: orderFromUrl || 'desc',
      minPrice: minPriceFromUrl || '',
      maxPrice: maxPriceFromUrl || '',
      bedrooms: bedroomsFromUrl || '',
      bathrooms: bathroomsFromUrl || '',
      location: locationFromUrl || '',
    });

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      
      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch listings');
        }
        
        const data = await res.json();
        
        if (data.length > 8) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
        
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    let newSidebarData = { ...sidebardata };
    let shouldAutoSubmit = false;

    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      newSidebarData.type = e.target.id;
      shouldAutoSubmit = true;
    }

    if (e.target.id === 'searchTerm') {
      newSidebarData.searchTerm = e.target.value;
    }

    if (e.target.id === 'location') {
      newSidebarData.location = e.target.value;
    }

    if (e.target.id === 'minPrice' || e.target.id === 'maxPrice') {
      newSidebarData[e.target.id] = e.target.value;
    }

    if (e.target.id === 'bedrooms' || e.target.id === 'bathrooms') {
      newSidebarData[e.target.id] = e.target.value;
      shouldAutoSubmit = true;
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      newSidebarData[e.target.id] = e.target.checked || e.target.checked === 'true' ? true : false;
      shouldAutoSubmit = true;
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'createdAt';
      const order = e.target.value.split('_')[1] || 'desc';
      newSidebarData.sort = sort;
      newSidebarData.order = order;
      shouldAutoSubmit = true;
    }

    setSidebardata(newSidebarData);

    // Auto-submit for certain filters
    if (shouldAutoSubmit) {
      setTimeout(() => {
        const urlParams = new URLSearchParams();
        
        if (newSidebarData.searchTerm) urlParams.set('searchTerm', newSidebarData.searchTerm);
        if (newSidebarData.type !== 'all') urlParams.set('type', newSidebarData.type);
        if (newSidebarData.parking) urlParams.set('parking', newSidebarData.parking);
        if (newSidebarData.furnished) urlParams.set('furnished', newSidebarData.furnished);
        if (newSidebarData.offer) urlParams.set('offer', newSidebarData.offer);
        if (newSidebarData.minPrice) urlParams.set('minPrice', newSidebarData.minPrice);
        if (newSidebarData.maxPrice) urlParams.set('maxPrice', newSidebarData.maxPrice);
        if (newSidebarData.bedrooms) urlParams.set('bedrooms', newSidebarData.bedrooms);
        if (newSidebarData.bathrooms) urlParams.set('bathrooms', newSidebarData.bathrooms);
        if (newSidebarData.location) urlParams.set('location', newSidebarData.location);
        
        urlParams.set('sort', newSidebarData.sort);
        urlParams.set('order', newSidebarData.order);
        
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
      }, 100);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    
    // Only add parameters if they have values
    if (sidebardata.searchTerm) urlParams.set('searchTerm', sidebardata.searchTerm);
    if (sidebardata.type !== 'all') urlParams.set('type', sidebardata.type);
    if (sidebardata.parking) urlParams.set('parking', sidebardata.parking);
    if (sidebardata.furnished) urlParams.set('furnished', sidebardata.furnished);
    if (sidebardata.offer) urlParams.set('offer', sidebardata.offer);
    if (sidebardata.minPrice) urlParams.set('minPrice', sidebardata.minPrice);
    if (sidebardata.maxPrice) urlParams.set('maxPrice', sidebardata.maxPrice);
    if (sidebardata.bedrooms) urlParams.set('bedrooms', sidebardata.bedrooms);
    if (sidebardata.bathrooms) urlParams.set('bathrooms', sidebardata.bathrooms);
    if (sidebardata.location) urlParams.set('location', sidebardata.location);
    
    // Always set sort and order
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const clearFilters = () => {
    setSidebardata({
      searchTerm: '',
      type: 'all',
      parking: false,
      furnished: false,
      offer: false,
      sort: 'createdAt',
      order: 'desc',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      location: '',
    });
    navigate('/search');
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    
    try {
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      if (!res.ok) {
        throw new Error('Failed to fetch more listings');
      }
      
      const data = await res.json();
      if (data.length < 9) {
        setShowMore(false);
      }
      setListings([...listings, ...data]);
    } catch (error) {
      console.error('Error fetching more listings:', error);
      setShowMore(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <FaFilter className="mr-2 text-blue-600" />
                  Filters
                </h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-800 flex items-center"
                  >
                    <FaTimes className="mr-1" />
                    Clear ({activeFiltersCount})
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Search Term */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Properties
                  </label>
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="searchTerm"
                      placeholder="Luxury apartment, downtown..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
                      value={sidebardata.searchTerm}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="location"
                      placeholder="City, neighborhood..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
                      value={sidebardata.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Property Type
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'all', label: 'All Properties', icon: FaHome },
                      { id: 'rent', label: 'For Rent', icon: FaHome },
                      { id: 'sale', label: 'For Sale', icon: FaHome }
                    ].map(({ id, label, icon: Icon }) => (
                      <label key={id} className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                        sidebardata.type === id 
                          ? 'bg-blue-100 border-2 border-blue-500' 
                          : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                      }`}>
                        <input
                          type="radio"
                          id={id}
                          name="type"
                          className="sr-only"
                          onChange={handleChange}
                          checked={sidebardata.type === id}
                        />
                        <Icon className={`mr-3 ${sidebardata.type === id ? 'text-blue-600' : 'text-gray-400'}`} />
                        <span className={`font-medium ${sidebardata.type === id ? 'text-blue-900' : 'text-gray-700'}`}>
                          {label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Price Range
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type="number"
                        id="minPrice"
                        placeholder="Min"
                        className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 text-sm"
                        value={sidebardata.minPrice}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="relative">
                      <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        type="number"
                        id="maxPrice"
                        placeholder="Max"
                        className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 text-sm"
                        value={sidebardata.maxPrice}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Bedrooms & Bathrooms */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bedrooms
                    </label>
                    <div className="relative">
                      <FaBed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                      <select
                        id="bedrooms"
                        className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 text-sm appearance-none"
                        value={sidebardata.bedrooms}
                        onChange={handleChange}
                      >
                        <option value="">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5+</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bathrooms
                    </label>
                    <div className="relative">
                      <FaBath className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                      <select
                        id="bathrooms"
                        className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 text-sm appearance-none"
                        value={sidebardata.bathrooms}
                        onChange={handleChange}
                      >
                        <option value="">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Amenities
                  </label>
                  <div className="space-y-2">
                    {[
                      { id: 'parking', label: 'Parking Available', icon: FaCar },
                      { id: 'furnished', label: 'Furnished', icon: FaCouch },
                      { id: 'offer', label: 'Special Offers', icon: FaTag }
                    ].map(({ id, label, icon: Icon }) => (
                      <label key={id} className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                        sidebardata[id] 
                          ? 'bg-green-100 border-2 border-green-500' 
                          : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                      }`}>
                        <input
                          type="checkbox"
                          id={id}
                          className="sr-only"
                          onChange={handleChange}
                          checked={sidebardata[id]}
                        />
                        <Icon className={`mr-3 ${sidebardata[id] ? 'text-green-600' : 'text-gray-400'}`} />
                        <span className={`font-medium ${sidebardata[id] ? 'text-green-900' : 'text-gray-700'}`}>
                          {label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <div className="relative">
                    <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      onChange={handleChange}
                      value={`${sidebardata.sort}_${sidebardata.order}`}
                      id="sort_order"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 appearance-none"
                    >
                      <option value="regularPrice_desc">Price: High to Low</option>
                      <option value="regularPrice_asc">Price: Low to High</option>
                      <option value="createdAt_desc">Newest First</option>
                      <option value="createdAt_asc">Oldest First</option>
                      <option value="bedrooms_desc">Most Bedrooms</option>
                      <option value="bathrooms_desc">Most Bathrooms</option>
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
                >
                  <FaSearch className="h-4 w-4" />
                  <span>Search Properties</span>
                </button>
              </form>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Search Results
                  </h1>
                  <p className="text-gray-600">
                    {loading ? 'Searching...' : `${listings.length} properties found`}
                  </p>
                </div>
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                  <span className="text-sm text-gray-600">View:</span>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                        viewMode === 'grid'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <FaTh className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                        viewMode === 'list'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <FaList className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-white/50 p-4 mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">Active filters:</span>
                  {sidebardata.searchTerm && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      &quot;{sidebardata.searchTerm}&quot;
                    </span>
                  )}
                  {sidebardata.type !== 'all' && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {sidebardata.type === 'rent' ? 'For Rent' : 'For Sale'}
                    </span>
                  )}
                  {sidebardata.minPrice && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Min: ${sidebardata.minPrice}
                    </span>
                  )}
                  {sidebardata.maxPrice && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Max: ${sidebardata.maxPrice}
                    </span>
                  )}
                  {sidebardata.parking && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      Parking
                    </span>
                  )}
                  {sidebardata.furnished && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      Furnished
                    </span>
                  )}
                  {sidebardata.offer && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                      Special Offers
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Results Grid */}
            <div className="space-y-6">
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-lg text-gray-600">Searching properties...</p>
                  </div>
                </div>
              )}

              {!loading && listings.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaHome className="text-gray-400 text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No properties found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
                  <button
                    onClick={clearFilters}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {!loading && listings.length > 0 && (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {listings.map((listing) => (
                    <ListingItem 
                      key={listing._id} 
                      listing={listing} 
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              )}

              {showMore && (
                <div className="text-center py-8">
                  <button
                    onClick={onShowMoreClick}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Load More Properties
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}