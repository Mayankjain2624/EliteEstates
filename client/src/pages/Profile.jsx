import React,{useEffect, useRef, useState} from 'react'

import { useSelector } from 'react-redux'
function Profile() {
  const fileRef=useRef(null);
  const {user}=useSelector((state)=>state.user);

  const curreUser=user.currentUser;
  const [file,setFile]=useState(undefined);
  const [loading,setLoading]=useState(false);
  const [image,setImage]=useState(undefined);
  useEffect(()=>{
    if(file){
      setLoading(true);
      handleFileUpload(file);
    }
  },[file])
  const handleFileUpload=async (file)=>{
    const data= new FormData();
    data.append("file",file);
    data.append("upload_preset", "first_try");
    data.append("cloud_name","dj3ws7non");
    const res=await fetch("https://api.cloudinary.com/v1_1/dj3ws7non/image/upload",{
      method : "POST",
      body: data

    })
    const uploadedimage=await res.json();
    setLoading(false);
    setImage(uploadedimage.url);
    console.log(uploadedimage.url);
    
  }
  // console.log(file);
  return (
    <div className='p-3 max-w-lg mx-auto'>
     <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
     <form action="" className='flex flex-col'>
      <input onChange={(e)=>setFile(e.target.files[0])} 
      type="file" 
      name="" 
      id="" 
      ref={fileRef} hidden accept='image/*'/>
      <img onClick={()=>fileRef.current.click()} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 p-1'src={image||curreUser.avatar} alt="profile" />
      <input type="text" placeholder={curreUser.username} id='username' className='boreder p-3 rounded-lg' />
      <input type="email" placeholder='email' id='email' className='boreder p-3 rounded-lg' />
      <input type="password" placeholder='password ' id='password' className='boreder p-3 rounded-lg' />
      <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
     </form>
     <div className='flex justify-between mt-5 p-1'>
      <span className='text-red-700 cursor-pointer'>Delete Account</span>
      <span className='text-red-700 cursor-pointer'>Sign Out</span>
      {/* <p>{loading}</p> */}
     </div>
     <span className='text-center'>{!loading && !image ?null:loading && !image?<p>Uploading... </p> : <p className='text-green-600'>sucessfully uploaded</p>}</span>

    </div>
  )
}

export default Profile
                   