const AuthForm = ({ isCreate }) => {
    
  return (
    <form className="flex flex-col gap-3 w-full md:w-[70%] mx-auto p-4 rounded-md bg-[#1E293B]">
      {isCreate && (
        <div className="flex flex-col gap-3">
          <label htmlFor="username" className="text-lg font-semibold">
            UserName
          </label>
          <input
            type="text"
            required
            id="username"
            name="username"
            className="px-3 py-2 bg-[#0B1120] rounded-md focus:outline-none text-white focus:border focus:border-main"
            placeholder="Enter Your Username"
          />
          <p className="text-sm text-[#f00] -mt-2 pl-2"></p>
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
          className="px-3 py-2 bg-[#0B1120] rounded-md focus:outline-none text-white focus:border focus:border-main"
          placeholder="Enter Your Email"
        />
        <p className="text-sm text-[#f00] -mt-2 pl-2"></p>
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
          className="px-3 py-2 bg-[#0B1120] rounded-md focus:outline-none text-white focus:border focus:border-main"
          placeholder="Enter Your Password"
        />
        <p className="text-sm text-[#f00] -mt-2 pl-2"></p>
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
            className="px-3 py-2 bg-[#0B1120] rounded-md focus:outline-none text-white focus:border focus:border-main"
            placeholder="Enter Your Password Again"
          />
          <p className="text-sm text-[#f00] -mt-2 pl-2"></p>
        </div>
      )}
      <button type="submit" className="main-btn">
        {isCreate ? "Create Account" : "Sign In"}
      </button>
    </form>
  );
};

export default AuthForm;
