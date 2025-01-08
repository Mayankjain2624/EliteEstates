import React from 'react'

function Createlisting() {
    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold  text-center my-7'>Create a  Listing</h1>
            <form className='flex flex-col space-y-6 sm:flex-row sm:space-x-6 sm:space-y-0 gap-4'>
                <div className="flex flex-col  gap-4 flex-1">

                    <input type="text" placeholder='name' id='name' name='name' className='border p-3 rounded-lg ' maxLength={62} minLength={10} required />
                    <input type="textarea" placeholder='description' id='description' name='description' className='border p-3 rounded-lg ' maxLength={62} minLength={10} required />
                    <input type="text" placeholder='address' id='address' name='address' className='border p-3 rounded-lg ' maxLength={62} minLength={10} required />
                    <div className="flex gap-6 flex-wrap">
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='sale'
                                className='w-5'

                            />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='rent'
                                className='w-5'
                            />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='parking'
                                className='w-5'
                            />
                            <span>Parking spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='furnished'
                                className='w-5'
                            />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                id='offer'
                                className='w-5'
                            />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-6">
                        <div className='flex items-center gap-2'>
                            <input
                                type='number'
                                id='bedrooms'
                                min='1'
                                max='10'
                                required
                                className='p-3 border border-gray-300 rounded-lg' />
                            <p>Beds</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input
                                type='number'
                                id='bathrooms'
                                min='1'
                                max='10'
                                required
                                className='p-3 border border-gray-300 rounded-lg' />
                            <p>Baths</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input
                                type='number'
                                id='bathrooms'
                                min='1'
                                max='10'
                                required
                                className='p-3 border border-gray-300 rounded-lg' />
                            <div className="flex flex-col items-center">
                                <p>Regular price</p>
                                <span className='text-xs'>(Rs./month)</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input
                                type='number'
                                id='bathrooms'
                                min='1'
                                max='10'
                                required
                                className='p-3 border border-gray-300 rounded-lg' />
                            <div className="flex flex-col items-center">
                                <p>Discounted price</p>
                                <span className='text-xs'>(Rs./month)</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="flex flex-col flex-1 gap-4">
                    <p className='font-semibold'>Images:
                        <span className='font font-normal text-gray-600 ml-2'>The first image will be cover </span>
                    </p>
                    <div className="flex gap-4">

                        <input type="file" id='images' multiple className='border border-gray-300 p-3 rounded-w-full ' required accept='image/*' />
                        <button className='p-3 text-green-700 border border-green-700 rounded uppercase hovershadow -lg disabled: opacity-80'>Upload</button>
                    </div>
                <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>Create Listintg</button>
                </div>
            </form>
        </main>
    )
}

export default Createlisting


// <div className="">
// <div className="gap-3">
//     <input  type="number" id='bedrooms' min={1} max={10} required className='p-3 border-gray-300 rounded-lg'/>
//       <p>bedrooms</p>
// </div>