/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { DeleteAccount, LogOut, UploadPhoto } from "../components";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imgData, setImgData] = useState(currentUser.imgProfile);
  const [isSumbit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    imgProfile: currentUser.imgProfile,
    username: currentUser.username,
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateForm = (values) => {
    const errors = {};
    if (values.username.trim().length === 0) {
      values.username = currentUser.username;
    }
    if (values.password.trim().length) {
      if (values.password.trim().length < 8) {
        errors.passErr = "Password Can't Be less than 8 characters";
      }
      if (values.password !== values.confirmPassword) {
        errors.confirmPassErr = "Password and Confirm password do not match";
      }
    }
    return errors;
  };
  const onSumbitHandler = (e) => {
    e.preventDefault();
    setErrors(validateForm(formData));
    setIsSubmit(true);
  };
  const sendDataToServer = async () => {
    dispatch(updateUserStart());
    try {
      const response = await fetch(`/api/users/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          imgProfile: formData.imgProfile,
          password: formData.password.length > 0 ? formData.password : null,
        }),
      });
      const data = await response.json();

      if (data.message) {
        dispatch(updateUserFailure());
        toast.error(data.message);
      } else {
        dispatch(updateUserSuccess(data.userData));
        toast.success("Profile Updated Successfully");
        console.log(data);
      }
    } catch (error) {
      dispatch(updateUserFailure());
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSumbit) {
      sendDataToServer();
    } else {
      console.log(errors);
    }
  }, [errors]);
  return (
    <section>
      <div className="section-container">
        <UploadPhoto
          imgData={imgData}
          setImgData={setImgData}
          formData={formData}
          setFormData={setFormData}
        />
        <h1 className="text-3xl sm:text-4xl font-bold text-center my-6 capitalize text-main">
          {currentUser.username}
        </h1>
        <div className="w-full md:w-[60%] mx-auto">
          <form className="flex gap-6 flex-col my-8" onSubmit={onSumbitHandler}>
            <input
              type="text"
              name="username"
              defaultValue={currentUser.username}
              value={formData.username}
              onChange={onChangeHandler}
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
              value={formData.password}
              onChange={onChangeHandler}
              className="px-3 py-2 bg-[#1E293B] rounded-md focus:outline-none text-white focus:border focus:border-main"
              placeholder="password:*********"
            />
            <p className="text-sm text-red-700 -mt-4 font-semibold">
              {errors.passErr}
            </p>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChangeHandler}
              className="px-3 py-2 bg-[#1E293B] rounded-md focus:outline-none text-white focus:border focus:border-main"
              placeholder="password again:*********"
            />
            <p className="text-sm text-red-700 -mt-4 font-semibold">
              {errors.confirmPassErr}
            </p>
            <button
              type="submit"
              disabled={loading}
              className={`main-btn mx-auto w-full mt-0 ${
                loading && "cursor-not-allowed opacity-50"
              }`}
            >
              Update Profile
            </button>
          </form>
          <div className="flex items-center flex-wrap gap-6 justify-between">
            <DeleteAccount />
            <LogOut />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
