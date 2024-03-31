/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imgData, setImgData] = useState(currentUser.imgProfile);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    imgProfile: currentUser.imgProfile,
  });
  const [uploadSucess, setUploadSucess] = useState(false);
  const handleFileUpload = async (img) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + img.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.round(progress));
      },
      (error) => {
        console.log(error);
        toast.error("File size must be less than 2MB");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, imgProfile: downloadURL });
          setUploadSucess(true);
          toast.success("Image Uploaded Successfully");
        });
      }
    );
  };
  useEffect(() => {
    if (imgData) {
      handleFileUpload(imgData);
    }
  }, [imgData]);
  return (
    <section>
      <div className="section-container">
        <div className="relative w-fit mx-auto">
          <img
            src={formData.imgProfile}
            alt="profile-img"
            className="w-[200px] h-[200px] object-cover mx-auto mt-6 rounded-full"
          />
          <div className="absolute bottom-2 right-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImgData(e.target.files[0])}
              name="img"
              id="img"
              className="hidden"
            />
            <label
              htmlFor="img"
              className="cursor-pointer flex items-center justify-center w-[50px] h-[50px] rounded-full bg-[#1E293B]"
            >
              <img
                src="/assets/edit.png"
                alt="edit"
                className="w-[30px] h-[30px]"
              />
            </label>
          </div>
        </div>
        {uploadProgress > 0 && !uploadSucess && (
          <p className="text-center my-3 text-yellow-500 font-semibold">
            Uploading {uploadProgress}%
          </p>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold text-center my-6 capitalize text-main">
          {currentUser.username}
        </h1>
        <div className="w-full md:w-[60%] mx-auto">
          <form className="flex gap-6 flex-col my-8">
            <input
              type="text"
              name="username"
              defaultValue={currentUser.username}
              className="px-3 py-2 bg-[#1E293B] rounded-md focus:outline-none text-white focus:border focus:border-main"
              placeholder="Your Username"
            />
            <input
              type="email"
              name="email"
              readOnly
              defaultValue={currentUser.email}
              className="px-3 py-2 bg-[#1E293B] rounded-md focus:outline-none opacity-50"
              placeholder="Your Email"
            />
            <input
              type="password"
              name="password"
              className="px-3 py-2 bg-[#1E293B] rounded-md focus:outline-none text-white focus:border focus:border-main"
              placeholder="password:*********"
            />
            <input
              type="password"
              name="confirmPassword"
              className="px-3 py-2 bg-[#1E293B] rounded-md focus:outline-none text-white focus:border focus:border-main"
              placeholder="password again:*********"
            />
            <button type="submit" className="main-btn mx-auto w-full mt-0">
              Update Profile
            </button>
          </form>
          <div className="flex items-center flex-wrap gap-6 justify-between">
            <button
              type="button"
              className="main-btn mt-0 bg-red-700 border-red-700 hover:text-red-700"
            >
              Delete Account
            </button>
            <button
              type="button"
              className="main-btn mt-0 bg-violet-800 border-violet-800 hover:text-violet-800"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
