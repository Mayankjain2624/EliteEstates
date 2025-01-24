
import { useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
    // console.log(formData);
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
        <main className='p-5 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-8'>Create a Listing</h1>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-6 sm:flex-row sm:space-x-6 sm:space-y-0 gap-6'>
                <div className="flex flex-col gap-6 flex-1">
                    <input type="text" placeholder='Name' id='name' name='name' className='border p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400' maxLength={62} minLength={10} required onChange={handleChange} value={formData.name} />
                    <input type="textarea" placeholder='Description' id='description' name='description' className='border p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400' maxLength={62} minLength={10} required onChange={handleChange} value={formData.description} />
                    <input type="text" placeholder='Address' id='address' name='address' className='border p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400' maxLength={62} minLength={10} required onChange={handleChange} value={formData.address} />

                    <div className="flex gap-6 flex-wrap">
                        <div className='flex gap-2'>
                            <input type='checkbox' id='sale' className='w-5' onChange={handleChange} checked={formData.type === 'sale'}
                            />
                            <span>Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='rent' className='w-5'
                                onChange={handleChange}
                                checked={formData.type === 'rent'} />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='parking' className='w-5'
                                onChange={handleChange}
                            // checked={formData.parking==='parking'}
                            />
                            <span>Parking spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='furnished' className='w-5'
                                onChange={handleChange}
                            // checked={formData.furnished==='furnished'}
                            />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='offer' className='w-5'
                                onChange={handleChange}
                            // checked={formData.offer==='offer'}
                            />
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6">
                        <div className='flex items-center gap-2'>
                            <input type='number' id='bedrooms' min='1' max='10' required className='p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400' onChange={handleChange} value={formData.bedrooms} />
                            <p>Beds</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='number' id='bathrooms' min='1' max='10' required className='p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400' onChange={handleChange} value={formData.bathrooms} />
                            <p>Baths</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='number' id='regularPrice' min='50' max='1000000' required className='p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400' onChange={handleChange} value={formData.price} />
                            <div className="flex flex-col items-center">
                                <p>Regular price</p>
                                <span className='text-xs'>(Rs./month)</span>
                            </div>
                        </div>
                        {formData.offer && (

                        <div className='flex items-center gap-2'>
                            <input type='number' id='discountedPrice' min='50' max='1000000' required className='p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400' onChange={handleChange} value={formData['discounted-price']} />
                            <div className="flex flex-col items-center">
                                <p>Discounted price</p>
                                <span className='text-xs'>(Rs./month)</span>
                            </div>
                        </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col flex-1 gap-6">
                    <p className='font-semibold'>Images:
                        <span className='font-normal text-gray-600 ml-2'>The first image will be the cover image</span>
                    </p>
                    <div className="flex gap-4">
                        <input
                            type="file"
                            id="images"
                            multiple
                            className='border border-gray-300 p-4 rounded-lg w-full focus:ring-2 focus:ring-indigo-400'
                            accept="image/*"
                            onChange={(e) => setFiles(Array.from(e.target.files))}
                        />
                        <button
                            disabled={uploading}
                            type='button'
                            className='p-4 text-green-700 border border-green-700 rounded-lg uppercase hover:shadow-lg disabled:opacity-80'
                            onClick={handleImageSubmit}>
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>

                    <div className='flex flex-wrap gap-4'>
                        {formData.imageUrls.map((url, index) => (
                            <div key={url} className="flex justify-between p-4 border rounded-lg shadow-sm">
                                <img src={url} alt='image' className='w-24 h-24 object-contain rounded-lg' />
                                <button type='button' onClick={() => handleRemoveImage(index)} className='p-2 text-red-700 rounded-lg hover:opacity-75'>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        disabled={loading || uploading}
                        type='submit'  // Changed from 'button' to 'submit'
                        className='p-4 bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>
                        {loading ? 'Creating...' : 'Create Listing'}
                    </button>
                </div>
                {error && <p className='text-red-600 text-sm items-center'>{error}</p>}
                {listing.name && <p className='text-green-600 text-sm'>Listing created successfully</p>}
                {/* {(!loading && !error && listing!={}) && <p >Listing created successfully!</p>} */}
                <p className='text-red-600 text-sm'>{imageuploaderror}</p>
            </form>
        </main>
    );
}

export default Createlisting;
