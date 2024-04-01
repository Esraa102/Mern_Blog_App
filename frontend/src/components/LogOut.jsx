import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUserSuccess } from "../redux/user/userSlice";
const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "GET",
      });
      const data = await response.json();
      if (data.message) {
        toast.error(data.message);
      } else {
        dispatch(logoutUserSuccess());
        toast.success(data);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <button
      type="button"
      onClick={handleLogout}
      className="main-btn main-btn mt-0 bg-violet-800 border-violet-800 hover:text-violet-800 text-[18px]"
    >
      Logout
    </button>
  );
};

export default LogOut;
