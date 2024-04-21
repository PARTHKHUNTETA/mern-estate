import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../utils/firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
} from "../redux/slices/userSlice.js";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentUser, error, loading } = useSelector((store) => store.user);
  const fileRef = useRef();
  const [file, setFile] = useState(undefined);
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  useEffect(() => {
    let id = setTimeout(() => {
      setUpdateSuccess(false);
    }, 2000);

    return () => {
      clearTimeout(id);
    };
  }, [updateSuccess]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file?.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercent(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      dispatch(deleteUserStart());

      const res = await fetch(`api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess());
      setUpdateSuccess(true);
    } catch (err) {
      dispatch(deleteUserFailure(err.message));
    }
  };
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
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          className="hidden"
          accept="image/*"
        />
        <img
          src={formData?.avatar || currentUser?.avatar}
          alt="Profile Photo"
          onClick={() => fileRef.current.click()}
          className=" mt-2 object-cover self-center rounded-full h-24 w-24 cursor-pointer"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePercent > 0 && filePercent < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePercent}%`}</span>
          ) : filePercent === 100 ? (
            <span className="text-green-700 ">
              Image successfully uploaded!
            </span>
          ) : (
            ""
          )}
        </p>

        <input
          type="username"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
          defaultValue={currentUser?.username || ""}
        ></input>
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
          defaultValue={currentUser?.email || ""}
        ></input>
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        ></input>

        {error && <p className="text-red-500 my-5 text-center">{error}</p>}
        {updateSuccess && (
          <p className="text-green-800 my-5 text-center">
            Updated Successfully
          </p>
        )}

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
        <button onClick={handleDeleteUser} className="bg-transparent text-red-500 p-3 rounded-lg uppercase hover: opacity-95 ">
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
