import toast from "react-hot-toast";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const { user } = await signInWithPopup(auth, provider);
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.displayName,
          email: user.email,
          imgProfile: user.photoURL,
        }),
      });
      const data = await response.json();
      if (data.message) {
        toast.error(data.message);
      } else {
        dispatch(loginSuccess(data.userData));
        toast.success("Authenticated Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleAuth}
      className="main-btn bg-red-700 border-red-700 hover:text-red-700"
    >
      Continue With Google
    </button>
  );
};

export default OAuth;
