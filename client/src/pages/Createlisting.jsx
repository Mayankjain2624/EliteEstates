import { useState } from 'react';

function Createlisting() {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imagesUrls: [],
    });
    const [imageuploaderror, setimageuploaderror] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleImageSubmit = (e) => {
        if (files.length === 0) {
            setimageuploaderror('Please select at least one image to upload.');
            return;
        }

        if (files.length + formData.imagesUrls.length > 6) {
            setimageuploaderror('You can upload a maximum of 6 images per listing.');
            return;
        }

        setUploading(true);
        setimageuploaderror('');
        const promises = files.map(storeImage);
        Promise.all(promises).then((urls) => {
            const uniqueUrls = urls.filter((url) => !formData.imagesUrls.includes(url));
            setFormData({ ...formData, imagesUrls: formData.imagesUrls.concat(uniqueUrls) });
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
            imagesUrls: formData.imagesUrls.filter((_, i) => i !== index),
        });
    };

    return (
        <main className='p-5 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-8'>Create a Listing</h1>
            <form className='flex flex-col space-y-6 sm:flex-row sm:space-x-6 sm:space-y-0 gap-6'>
                <div className="flex flex-col gap-6 flex-1">
                    <input type="text" placeholder='Name' id='name' name='name' className='border p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400' maxLength={62} minLength={10} required />
                    <input type="textarea" placeholder='Description' id='description' name='description' className='border p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400' maxLength={62} minLength={10} required />
                    <input type="text" placeholder='Address' id='address' name='address' className='border p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400' maxLength={62} minLength={10} required />

                    <div className="flex gap-6 flex-wrap">
                        <div className='flex gap-2'>
                            <input type='checkbox' id='sale' className='w-5' />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='rent' className='w-5' />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='parking' className='w-5' />
                            <span>Parking spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='furnished' className='w-5' />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='offer' className='w-5' />
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6">
                        <div className='flex items-center gap-2'>
                            <input type='number' id='bedrooms' min='1' max='10' required className='p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400' />
                            <p>Beds</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='number' id='bathrooms' min='1' max='10' required className='p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400' />
                            <p>Baths</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='number' id='price' min='1' max='10000' required className='p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400' />
                            <div className="flex flex-col items-center">
                                <p>Regular price</p>
                                <span className='text-xs'>(Rs./month)</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='number' id='discounted-price' min='1' max='10000' required className='p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400' />
                            <div className="flex flex-col items-center">
                                <p>Discounted price</p>
                                <span className='text-xs'>(Rs./month)</span>
                            </div>
                        </div>
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
                        {formData.imagesUrls.map((url, index) => (
                            <div key={url} className="flex justify-between p-4 border rounded-lg shadow-sm">
                                <img src={url} alt='image' className='w-24 h-24 object-contain rounded-lg' />
                                <button type='button' onClick={() => handleRemoveImage(index)} className='p-2 text-red-700 rounded-lg hover:opacity-75'>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        type='button'
                        className='p-4 bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>
                        Create Listing
                    </button>
                </div>

                <p className='text-red-600 text-sm'>{imageuploaderror}</p>
            </form>
        </main>
    );
}

export default Createlisting;
