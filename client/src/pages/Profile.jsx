import React, { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser, error, loading } = useSelector((store) => store.user);
  const [formData, setFormData] = useState({});

  const handleSubmit = () => {};
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-4xl font-bold my-7">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <img
          src={currentUser?.avatar}
          alt="Profile Photo"
          className=" mt-2 object-cover self-center rounded-full h-24 w-24 cursor-pointer"
        />

        <input
          type="username"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
          value={currentUser?.username || ""}
        ></input>
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
          value={currentUser?.email || ""}
        ></input>
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        ></input>

        {error && <p className="text-red-500 my-5 text-center">{error}</p>}

        <button
          disabled={loading}
          className="bg-slate-900 text-white p-3 rounded-lg uppercase hover: opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading....." : "Update"}
        </button>
        <button className="bg-green-700 text-white p-3 rounded-lg uppercase hover: opacity-95 ">
          Create Listing
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <button className="bg-transparent text-red-500 p-3 rounded-lg uppercase hover: opacity-95 ">
          Delete Account
        </button>
        <button className="bg-transparent text-red-500 p-3 rounded-lg uppercase hover: opacity-95 ">
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Profile;
