import { AuthForm } from "../components";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section>
      <div className="section-container">
        <h1 className="text-center text-3xl text-main font-bold mb-4">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Please Enter Your Details To Log In
        </p>
        <AuthForm isCreate={false} />
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
