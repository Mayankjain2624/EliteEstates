import React from 'react'
import { use } from 'react'
import { useSelector } from 'react-redux'
function Profile() {
  const {user}=useSelector((state)=>state.user);
  const curreUser=user.currentUser;
  return (
    <div className='p-3 max-w-lg mx-auto'>
     <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
     <form action="" className='flex flex-col'>
      <img className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 p-1'src={curreUser.avatar} alt="profile" />
      <input type="text" placeholder='username' id='username' className='boreder p-3 rounded-lg' />
      <input type="email" placeholder='email' id='email' className='boreder p-3 rounded-lg' />
      <input type="password" placeholder='password ' id='password' className='boreder p-3 rounded-lg' />
      <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
     </form>
     <div className='flex justify-between mt-5 p-1'>
      <span className='text-red-700 cursor-pointer'>Delete Account</span>
      <span className='text-red-700 cursor-pointer'>Sign Out</span>
     </div>
    </div>
  )
}

export default Profile
