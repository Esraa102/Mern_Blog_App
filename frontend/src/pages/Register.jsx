import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthForm } from "../components";
import toast from "react-hot-toast";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const sendData = async (userInfo) => {
    setLoading(true);
    try {
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
        toast.success("User Signed Up Sucessfully");
        navigate("/login");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section>
      <div className="section-container">
        <h1 className="text-center text-2xl md:text-3xl text-main font-bold mb-4">
          Create New Account
        </h1>
        <p className="text-center text-sm md:text-lg text-gray-300 mb-8">
          Please Enter Your Details To Create A New Account
        </p>
        <AuthForm isCreate sendToServer={sendData} loading={loading} />
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
