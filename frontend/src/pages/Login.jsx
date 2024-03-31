import { AuthForm } from "../components";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const sendData = async (userInfo) => {
    dispatch(loginStart());
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
        toast.error(data.message || "Something Went Wrong");
        dispatch(loginFailure());
      } else {
        dispatch(loginSuccess(data.user));
        toast.success("Logged In Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message || "Something Went Wrong");
      dispatch(loginFailure());
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
