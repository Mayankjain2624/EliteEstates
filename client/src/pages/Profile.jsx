import { useEffect, useRef, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserstart,
} from "../redux/user/useSlice";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaCamera, 
  FaEdit, 
  FaSave, 
  FaSignOutAlt, 
  FaTrash, 
  FaShieldAlt, 
  FaHome, 
  FaPlus, 
  FaCalendar, 
  FaChartLine, 
  FaEye, 
  FaCheck
} from 'react-icons/fa';
function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const { currentUser, loading } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [iloading, setIloading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({});

  const handleFileUpload = useCallback(async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "first_try");
    data.append("cloud_name", "dj3ws7non");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dj3ws7non/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const uploadedImage = await res.json();
    setIloading(false);
    setImage(uploadedImage.url);
    setFormData({ ...formData, avatar: uploadedImage.url });
  }, [formData]);

  useEffect(() => {
    if (file) {
      setIloading(true);
      handleFileUpload(file);
    }
  }, [file, handleFileUpload]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (err) {
      dispatch(updateUserFailure(err.message));
    }
  };

  const handleDeleteUser = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data));
      } catch (err) {
        dispatch(deleteUserFailure(err.message));
      }
    }
  };

  const handleSignOut = async () => {
    try {
      console.log('Starting signout...');
      dispatch(signOutUserstart());
      const res = await fetch("/api/auth/signout", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      console.log('Signout response:', data);
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      console.log('Signout successful, navigating to home...');
      // Navigate to home page after successful signout
      navigate('/');
    } catch (err) {
      console.error('Signout error:', err);
      dispatch(signOutUserFailure(err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Profile
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Settings
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Manage your account and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sticky top-8">
              
              {/* Profile Picture Section */}
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <input
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                  />
                  <div
                    onClick={() => fileRef.current.click()}
                    className="relative w-32 h-32 mx-auto cursor-pointer group"
                  >
                    <img
                      className="w-full h-full rounded-2xl object-cover shadow-2xl ring-4 ring-white group-hover:scale-105 transition-all duration-300"
                      src={image || currentUser.avatar}
                      alt="profile"
                    />
                    <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <FaCamera className="text-white text-2xl" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <FaEdit className="text-white text-sm" />
                    </div>
                  </div>
                  
                  {iloading && (
                    <div className="absolute inset-0 bg-white/80 rounded-2xl flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mt-4">
                  {currentUser.username}
                </h2>
                <p className="text-gray-600">{currentUser.email}</p>
                
                {/* Role Badge */}
                <div className="mt-4">
                  <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                    currentUser.role === 'admin' ? 'bg-gradient-to-r from-red-400 to-red-500 text-white' :
                    currentUser.role === 'owner' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
                  }`}>
                    {currentUser.role === 'admin' ? (
                      <>
                        <FaShieldAlt className="mr-2" />
                        Administrator
                      </>
                    ) : currentUser.role === 'owner' ? (
                      <>
                        <FaHome className="mr-2" />
                        Property Owner
                      </>
                    ) : (
                      <>
                        <FaUser className="mr-2" />
                        Member
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                
                {(currentUser.role === 'owner' || currentUser.role === 'admin') && (
                  <>
                    <Link
                      to="/createlisting"
                      className="w-full flex items-center px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <FaPlus className="mr-3" />
                      Create New Listing
                    </Link>
                    
                    <Link
                      to="/mylisting"
                      className="w-full flex items-center px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <FaHome className="mr-3" />
                      My Properties
                    </Link>
                    
                    <div className="w-full flex items-center px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium">
                      <FaCalendar className="mr-3" />
                      Manage Tours
                    </div>
                    
                    <div className="w-full flex items-center px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium">
                      <FaChartLine className="mr-3" />
                      Analytics
                    </div>
                  </>
                )}
                
                {(currentUser.role === 'buyer' || currentUser.role === 'user') && (
                  <>
                    <div className="w-full flex items-center px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium">
                      <FaCalendar className="mr-3" />
                      My Tours
                    </div>
                    
                    <Link
                      to="/search"
                      className="w-full flex items-center px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <FaEye className="mr-3" />
                      Browse Properties
                    </Link>
                  </>
                )}
                
                {currentUser.role === 'admin' && (
                  <div className="w-full flex items-center px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium">
                    <FaShieldAlt className="mr-3" />
                    Admin Panel
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Settings Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
                {updateSuccess && (
                  <div className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    <FaCheck className="mr-2" />
                    Profile Updated Successfully
                  </div>
                )}
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                
                {/* Username Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Username
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 font-medium"
                      type="text"
                      placeholder="Enter your username"
                      defaultValue={currentUser.username}
                      id="username"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 font-medium"
                      type="email"
                      placeholder="Enter your email"
                      id="email"
                      defaultValue={currentUser.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    New Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 font-medium"
                      type="password"
                      placeholder="Enter new password (optional)"
                      id="password"
                      onChange={handleChange}
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Leave blank to keep current password
                  </p>
                </div>
                
                {/* Role Information */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Account Type</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {currentUser.role === 'admin' ? (
                        <FaShieldAlt className="text-red-500 text-2xl mr-3" />
                      ) : currentUser.role === 'owner' ? (
                        <FaHome className="text-blue-500 text-2xl mr-3" />
                      ) : (
                        <FaUser className="text-gray-500 text-2xl mr-3" />
                      )}
                      <div>
                        <p className="font-semibold text-gray-900 capitalize">
                          {currentUser.role}
                        </p>
                        <p className="text-sm text-gray-600">
                          {currentUser.role === 'admin' ? 'Full platform access with admin privileges' :
                           currentUser.role === 'owner' ? 'Can create and manage property listings' :
                           'Can browse properties and book tours'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    disabled={loading}
                    type="submit"
                    className="flex-1 flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <FaSave className="mr-3" />
                        Update Profile
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Danger Zone */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
                <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center justify-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-all duration-300"
                    >
                      <FaSignOutAlt className="mr-3" />
                      Sign Out
                    </button>
                    
                    <button
                      onClick={handleDeleteUser}
                      className="flex items-center justify-center px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all duration-300"
                    >
                      <FaTrash className="mr-3" />
                      Delete Account
                    </button>
                  </div>
                  <p className="text-sm text-red-600 mt-3">
                    These actions cannot be undone. Please be careful.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
