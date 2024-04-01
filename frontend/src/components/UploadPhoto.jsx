/* eslint-disable react-hooks/exhaustive-deps */
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const UploadPhoto = ({ imgData, setImgData, formData, setFormData }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
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
    <>
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
    </>
  );
};

export default UploadPhoto;
