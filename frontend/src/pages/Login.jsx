import { useState } from "react";
import { AuthForm } from "../components";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const sendData = async (userInfo) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userInfo.email,
          password: userInfo.password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.message) {
        toast.error(data.message);
      } else {
        toast.success("Logged In Successfully");
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
          Welcome Back!
        </h1>
        <p className="text-center text-sm md:text-lg text-gray-300 mb-8">
          Please Enter Your Details To Log In
        </p>
        <AuthForm isCreate={false} sendToServer={sendData} loading={loading} />
        <p className="text-center mt-3">
          Don&apos;t Have An Account?{" "}
          <Link
            to={"/register"}
            className="underline font-semibold hover:text-main transition"
          >
            Create One!
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
