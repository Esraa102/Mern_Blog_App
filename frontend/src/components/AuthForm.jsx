/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
const AuthForm = ({ isCreate, sendToServer }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    usernameErr: "",
    emailErr: "",
    passwordErr: "",
    confirmPasswordErr: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validateInputs = (values) => {
    const errors = {};
    const emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (isCreate) {
      if (values.username.trim().length === 0) {
        errors.usernameErr = "Username Can't Be Empty";
      }
      if (values.confirmPassword !== values.password) {
        errors.confirmPasswordErr =
          "confirm Password and password do not match";
      }
    }
    if (!emailRex.test(values.email)) {
      errors.emailErr = "You Entered Invalid Email Address";
    }
    if (values.password.trim().length < 8) {
      errors.passwordErr = "Password Should be at least 8 characters";
    }
    return errors;
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateInputs(formData));
    setIsSubmit(true);
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      sendToServer(formData);
    } else {
      console.log(formErrors);
    }
  }, [formErrors, isSubmit]);
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col gap-3 w-full md:w-[60%] mx-auto p-4 rounded-md bg-[#1E293B]"
    >
      {isCreate && (
        <div className="flex flex-col gap-3">
          <label htmlFor="username" className="text-lg font-semibold">
            UserName
          </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={onChangeHandler}
            value={formData.username}
            className="px-3 py-2 bg-[#0B1120] rounded-md focus:outline-none text-white focus:border focus:border-main"
            placeholder="Enter Your Username"
          />
          <p className="text-sm text-[#f00] -mt-2 pl-2">
            {formErrors.usernameErr}
          </p>
        </div>
      )}
      <div className="flex flex-col gap-3">
        <label htmlFor="email" className="text-lg font-semibold">
          Email
        </label>
        <input
          type="text"
          required
          id="email"
          name="email"
          onChange={onChangeHandler}
          value={formData.email}
          className="px-3 py-2 bg-[#0B1120] rounded-md focus:outline-none text-white focus:border focus:border-main"
          placeholder="Enter Your Email"
        />
        <p className="text-sm text-[#f00] -mt-2 pl-2">{formErrors.emailErr}</p>
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="pass" className="text-lg font-semibold">
          Password
        </label>
        <input
          type="password"
          required
          id="pass"
          name="password"
          onChange={onChangeHandler}
          value={formData.password}
          className="px-3 py-2 bg-[#0B1120] rounded-md focus:outline-none text-white focus:border focus:border-main"
          placeholder="Enter Your Password"
        />
        <p className="text-sm text-[#f00] -mt-2 pl-2">
          {formErrors.passwordErr}
        </p>
      </div>
      {isCreate && (
        <div className="flex flex-col gap-3">
          <label htmlFor="re-password" className="text-lg font-semibold">
            Confirm Password
          </label>
          <input
            type="password"
            required
            id="re-password"
            name="confirmPassword"
            onChange={onChangeHandler}
            value={formData.confirmPassword}
            className="px-3 py-2 bg-[#0B1120] rounded-md focus:outline-none text-white focus:border focus:border-main"
            placeholder="Enter Your Password Again"
          />
          <p className="text-sm text-[#f00] -mt-2 pl-2">
            {formErrors.confirmPasswordErr}
          </p>
        </div>
      )}
      <button type="submit" className="main-btn">
        {isCreate ? "Create Account" : "Sign In"}
      </button>
      <button
        type="button"
        className="main-btn bg-red-600 border-red-600 hover:text-red-600"
      >
        Continue With Google
      </button>
    </form>
  );
};

export default AuthForm;
