import React, { useEffect, useRef, useState } from 'react'

import { useSelector } from 'react-redux'
import { updateUserFailure,updateUserSuccess,updateUserStart, deleteUserFailure, deleteUserSuccess, signOutUserFailure, signOutUserSuccess, signOutUserstart } from '../redux/user/useSlice';
import { useDispatch } from 'react-redux';
function Profile() {
  const dispatch=useDispatch();
  const fileRef = useRef(null);
  const {currentUser,loading,error} = useSelector((state) => state.user);

  // const currentUser = user.currentUser;
  console.log(currentUser);
  const [file, setFile] = useState(undefined);
  const [iloading, setIloading] = useState(false);
  // const [hloading,setHloading]=useState(false);
  const [updateSuccess,setUpdateSuccess]=useState(false);
  const [image, setImage] = useState(null);
  const [formData,setFormData]=useState({});
  useEffect(() => {
    if (file) {
      setIloading(true);
      handleFileUpload(file);
    }
  }, [file])
  const handleFileUpload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "first_try");
    data.append("cloud_name", "dj3ws7non");
    const res = await fetch("https://api.cloudinary.com/v1_1/dj3ws7non/image/upload", {
      method: "POST",
      body: data
    })
    const uploadedimage = await res.json();
    setIloading(false);
    setImage(uploadedimage.url);
    setFormData({...formData , avatar: uploadedimage.url});
    // console.log(uploadedimage.url);
    
  }
  const handleChange=(e)=>{
    setFormData({
      ...formData,
       [e.target.id] : e.target.value,
    });
  }

  console.log("formdata",formData);
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      // setHloading(true);
      const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify(formData)
      });
      const data= await res.json();
      if(data.success===false){
        dispatch(updateUserFailure(data.message));
        return;
      }
    dispatch(updateUserSuccess(data));
     setUpdateSuccess(true);
    // setHloading(false);
    }catch(err){
      dispatch(updateUserFailure(err.message));
      // setHloading(false);
    }

  }
  const handleDeleteUser=async()=>{
    try{
      dispatch(signOutUserstart())
      const res= await fetch(`/api/user/delete/${currentUser._id}`,{
        method : 'DELETE',
        headers : {
          'Content-Type' : 'application/json',
        },
      });
    const data=await res.json();
   if(data.success===false)
   {
    dispatch(deleteUserFailure(data.message))
    return ;
   }
   dispatch(deleteUserSuccess(data));
    }catch(err){
      dispatch(deleteUserFailure(err.message))
    }
  }
  const handleSignOut=async ()=>{
   try{
    dispatch(signOutUserstart())
     const res=await fetch('/api/auth/signout');
     const data=await res.json();
     if(data.success===false)
     {
      dispatch(signOutUserFailure(data.message));
      return;
     }
     dispatch(signOutUserSuccess(data));
   }catch(err){
      dispatch(signOutUserFailure(err.message));
   }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form action="" className='flex flex-col' onSubmit={handleSubmit}>
        <input onChange={(e) => setFile(e.target.files[0])}
          type="file"
          name=""
          id=""
          ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 p-1' src={image || currentUser.avatar} alt="profile" />
        <input className='boreder p-3 rounded-lg'
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          id='username'

          onChange={handleChange}
        />
        <input className='boreder p-3 rounded-lg'
          type="email"
          placeholder='email'
          id='email'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input className='boreder p-3 rounded-lg'
          type="password"
          placeholder='password '
          id='password'
          onChange={handleChange}
        />
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{loading ? "Updating..." : "Update"}</button>
      </form>
      <div className='flex justify-between mt-5 p-1'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out</span>
        {/* <p>{loading}</p> */}
      </div>
      <span className='text-center'>{(!iloading && !image) ? null : iloading && !image ? <p>Uploading... </p> : <p className='text-green-600'>sucessfully uploaded</p>}</span>
       {updateSuccess?<span className='text-center text-green-600'>user is successfully updated</span>
       :''}
      </div>
  )
}

export default Profile
