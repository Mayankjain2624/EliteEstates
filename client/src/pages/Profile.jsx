import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserstart,
} from "../redux/user/useSlice";
import { Link } from "react-router-dom";
function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [iloading, setIloading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      setIloading(true);
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
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
  };

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
    try {
      dispatch(signOutUserstart());
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
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserstart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (err) {
      dispatch(signOutUserFailure(err.message));
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-xl border border-gray-200">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Profile
      </h1>
      <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            className="rounded-full h-28 w-28 object-cover cursor-pointer border-2 border-gray-300 shadow-md hover:shadow-lg transition duration-200"
            src={image || currentUser.avatar}
            alt="profile"
          />
          {iloading && (
            <p className="text-sm text-blue-500 mt-3">Uploading...</p>
          )}
        </div>

        <input
          className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
          id="username"
          onChange={handleChange}
        />
        <input
          className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-blue-600 text-white rounded-md py-2 uppercase hover:bg-blue-700 disabled:bg-blue-400 transition duration-200"
        >
          {loading ? "Updating..." : "Update"}
        </button>
        <Link to={"/createlisting"} className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-80">create listing</Link>
      </form>

      {updateSuccess && (
        <p className="mt-4 text-center text-green-600">
          User updated successfully!
        </p>
      )}

      <div className="flex justify-between mt-6 text-sm text-gray-700">
        <span
          onClick={handleDeleteUser}
          className="text-red-600 cursor-pointer hover:underline hover:text-red-700 transition duration-200"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-600 cursor-pointer hover:underline hover:text-red-700 transition duration-200"
        >
          Sign Out
        </span>
      </div>
    </div>
  );
}

export default Profile;
