
import { useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    FaHome, 
    FaMapMarkerAlt, 
    FaBed, 
    FaBath, 
    FaCar, 
    FaCouch, 
    FaTag, 
    FaUpload, 
    FaTrash, 
    FaPlus,
    FaImage,
    FaDollarSign,
    FaPercent
} from 'react-icons/fa';

function Createlisting() {
    const navigate=useNavigate();
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountedPrice: 50,
        offer: false,
        parking: false,
        furnished: false,

    });
    const { currentUser } = useSelector((state) => state.user);
    const [imageuploaderror, setimageuploaderror] = useState('');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [listing,setListing]=useState({});
    console.log(listing);

    const handleImageSubmit = () => {
        if (files.length === 0) {
            setimageuploaderror('Please select at least one image to upload.');
            return;
        }

        if (files.length + formData.imageUrls.length > 6) {
            setimageuploaderror('You can upload a maximum of 6 images per listing.');
            return;
        }

        setUploading(true);
        setimageuploaderror('');
        const promises = files.map(storeImage);
        Promise.all(promises).then((urls) => {
            const uniqueUrls = urls.filter((url) => !formData.imageUrls.includes(url));
            setFormData({ ...formData, imageUrls: formData.imageUrls.concat(uniqueUrls) });
            setUploading(false);
        }).catch((error) => {
            console.error('Image upload failed:', error);
            setimageuploaderror('Image upload failed. Ensure each image is under 2MB.');
            setUploading(false);
        });
    };

    const storeImage = async (file) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'first_try');
        data.append('cloud_name', 'dj3ws7non');

        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dj3ws7non/image/upload', {
                method: 'POST',
                body: data,
            });
            if (!res.ok) {
                throw new Error('Failed to upload image');
            }
            const uploadedImage = await res.json();
            return uploadedImage.url;
        } catch (error) {
            console.error('Image upload failed:', error);
            throw error;
        }
    };

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    };

    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({ ...formData, type: e.target.id });
        }
        else {
            const { id, value, checked, type } = e.target;
            if (type === 'checkbox') {
                setFormData({ ...formData, [id]: checked });
            }
            else {
                setFormData({ ...formData, [id]: value });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(formData.imageUrls.length===0){return setError('Please upload at least one image');}
            if(formData.regularPrice<formData.discountedPrice){return setError('Discounted price should be less than regular price');}
            setLoading(true);
            setError('');
            const res = await fetch('/api/listing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    useRef: currentUser._id
                }),
            });
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || 'Failed to create listing');
            }
            const data = await res.json();
            console.log(data);
            setListing(data);
            
            setLoading(false);
            navigate(`/listing/${data._id}`);
            if (data.success === false) {
                setError(data.message);
                return;
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 shadow-lg">
                        <FaHome className="text-white text-2xl" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Create New Listing</h1>
                    <p className="text-gray-600">Add your property to the marketplace</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Property Details */}
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-8 space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                            <FaHome className="mr-3 text-blue-600" />
                            Property Information
                        </h2>

                        {/* Property Name */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Property Name</label>
                            <input 
                                type="text" 
                                placeholder="Beautiful 3BR Modern Apartment" 
                                id="name" 
                                name="name" 
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm" 
                                maxLength={62} 
                                minLength={10} 
                                required 
                                onChange={handleChange} 
                                value={formData.name} 
                            />
                        </div>

                        {/* Description */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea 
                                placeholder="Describe your property in detail..." 
                                id="description" 
                                name="description" 
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm resize-none" 
                                maxLength={500} 
                                minLength={10} 
                                required 
                                onChange={handleChange} 
                                value={formData.description} 
                            />
                        </div>

                        {/* Address */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                            <div className="relative">
                                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="123 Main Street, City, State" 
                                    id="address" 
                                    name="address" 
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm" 
                                    maxLength={100} 
                                    minLength={10} 
                                    required 
                                    onChange={handleChange} 
                                    value={formData.address} 
                                />
                            </div>
                        </div>

                        {/* Property Type & Features */}
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">Property Type & Features</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {/* Sale/Rent */}
                                <div className="col-span-2 sm:col-span-1 space-y-3">
                                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                                        <input 
                                            type="radio" 
                                            id="sale" 
                                            name="type"
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500" 
                                            onChange={handleChange} 
                                            checked={formData.type === 'sale'}
                                        />
                                        <label htmlFor="sale" className="text-sm font-medium text-gray-700">For Sale</label>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                                        <input 
                                            type="radio" 
                                            id="rent" 
                                            name="type"
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500" 
                                            onChange={handleChange}
                                            checked={formData.type === 'rent'} 
                                        />
                                        <label htmlFor="rent" className="text-sm font-medium text-gray-700">For Rent</label>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                                        <input 
                                            type="checkbox" 
                                            id="parking" 
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                                            onChange={handleChange}
                                        />
                                        <FaCar className="text-gray-500" />
                                        <label htmlFor="parking" className="text-sm font-medium text-gray-700">Parking</label>
                                    </div>
                                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                                        <input 
                                            type="checkbox" 
                                            id="furnished" 
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                                            onChange={handleChange}
                                        />
                                        <FaCouch className="text-gray-500" />
                                        <label htmlFor="furnished" className="text-sm font-medium text-gray-700">Furnished</label>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                                        <input 
                                            type="checkbox" 
                                            id="offer" 
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
                                            onChange={handleChange}
                                        />
                                        <FaTag className="text-gray-500" />
                                        <label htmlFor="offer" className="text-sm font-medium text-gray-700">Special Offer</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Room Details & Pricing */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Bedrooms */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                                <div className="relative">
                                    <FaBed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input 
                                        type="number" 
                                        id="bedrooms" 
                                        min="1" 
                                        max="10" 
                                        required 
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm" 
                                        onChange={handleChange} 
                                        value={formData.bedrooms} 
                                    />
                                </div>
                            </div>

                            {/* Bathrooms */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                                <div className="relative">
                                    <FaBath className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input 
                                        type="number" 
                                        id="bathrooms" 
                                        min="1" 
                                        max="10" 
                                        required 
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm" 
                                        onChange={handleChange} 
                                        value={formData.bathrooms} 
                                    />
                                </div>
                            </div>

                            {/* Regular Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Regular Price {formData.type === 'rent' && '(per month)'}
                                </label>
                                <div className="relative">
                                    <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input 
                                        type="number" 
                                        id="regularPrice" 
                                        min="50" 
                                        max="1000000" 
                                        required 
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm" 
                                        onChange={handleChange} 
                                        value={formData.regularPrice} 
                                    />
                                </div>
                            </div>

                            {/* Discounted Price */}
                            {formData.offer && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Discounted Price {formData.type === 'rent' && '(per month)'}
                                    </label>
                                    <div className="relative">
                                        <FaPercent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input 
                                            type="number" 
                                            id="discountedPrice" 
                                            min="50" 
                                            max="1000000" 
                                            required 
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 backdrop-blur-sm" 
                                            onChange={handleChange} 
                                            value={formData.discountedPrice} 
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Image Upload */}
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-8 space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                            <FaImage className="mr-3 text-blue-600" />
                            Property Images
                        </h2>

                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                <span className="font-medium">Note:</span> The first image will be the cover image (max 6 images)
                            </p>

                            {/* File Upload */}
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 transition-colors duration-200">
                                <div className="text-center">
                                    <FaUpload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                    <div className="flex text-sm text-gray-600">
                                        <label htmlFor="images" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                            <span>Upload images</span>
                                            <input
                                                id="images"
                                                name="images"
                                                type="file"
                                                multiple
                                                className="sr-only"
                                                accept="image/*"
                                                onChange={(e) => setFiles(Array.from(e.target.files))}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB each</p>
                                </div>
                            </div>

                            {/* Upload Button */}
                            <button
                                disabled={uploading || files.length === 0}
                                type="button"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 disabled:opacity-70 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
                                onClick={handleImageSubmit}
                            >
                                {uploading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                        <span>Uploading...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaPlus className="h-4 w-4" />
                                        <span>Upload Images</span>
                                    </>
                                )}
                            </button>

                            {/* Error Messages */}
                            {imageuploaderror && (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                    <p className="text-red-600 text-sm flex items-center">
                                        <span className="mr-2">⚠️</span>
                                        {imageuploaderror}
                                    </p>
                                </div>
                            )}

                            {/* Uploaded Images */}
                            {formData.imageUrls.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-gray-800">Uploaded Images</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {formData.imageUrls.map((url, index) => (
                                            <div key={url} className="relative group">
                                                <img 
                                                    src={url} 
                                                    alt={`Property image ${index + 1}`} 
                                                    className="w-full h-32 object-cover rounded-xl border border-gray-200" 
                                                />
                                                {index === 0 && (
                                                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
                                                        Cover
                                                    </div>
                                                )}
                                                <button 
                                                    type="button" 
                                                    onClick={() => handleRemoveImage(index)} 
                                                    className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <FaTrash className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                disabled={loading || uploading}
                                type="submit"
                                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 focus:ring-4 focus:ring-green-200 disabled:opacity-70 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 text-lg"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                                        <span>Creating Listing...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaHome className="h-5 w-5" />
                                        <span>Create Listing</span>
                                    </>
                                )}
                            </button>

                            {/* Success/Error Messages */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                    <p className="text-red-600 text-sm flex items-center">
                                        <span className="mr-2">⚠️</span>
                                        {error}
                                    </p>
                                </div>
                            )}

                            {listing.name && (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                    <p className="text-green-600 text-sm flex items-center">
                                        <span className="mr-2">✅</span>
                                        Listing created successfully!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Createlisting;
