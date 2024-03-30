import { Link } from "react-router-dom";
import { AuthForm } from "../components";
import toast from "react-hot-toast";
// import axios from "axios";
const Register = () => {
  const sendData = async (userInfo) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userInfo.username,
        email: userInfo.email,
        password: userInfo.password,
      }),
    });
    const data = await response.json();
    if (data.message) {
      toast.error(data.message);
    } else {
      toast.success("User Created Sucessfully");
    }
  };
  return (
    <section>
      <div className="section-container">
        <h1 className="text-center text-3xl text-main font-bold mb-4">
          Create New Account
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Please Enter Your Details To Create A New Account
        </p>
        <AuthForm isCreate sendToServer={sendData} />
        <p className="text-center mt-3">
          Already Have An Account?{" "}
          <Link
            to={"/login"}
            className="underline font-semibold hover:text-main transition"
          >
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
