import { Link } from "react-router-dom";
import { AuthForm } from "../components";

const Register = () => {
  return (
    <section>
      <div className="section-container">
        <h1 className="text-center text-3xl text-main font-bold mb-4">
          Create New Account
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Please Enter Your Details To Create A New Account
        </p>
        <AuthForm isCreate />
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
