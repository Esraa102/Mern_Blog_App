import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../redux/user/userSlice";
const DeleteAccount = () => {
  const { currentUser, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleDeleteUser = async () => {
    dispatch(deleteUserStart());
    try {
      const response = await fetch(`/api/users/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
      if (data.message) {
        dispatch(deleteUserFailure());
        toast.error(data.message);
      } else {
        dispatch(deleteUserSuccess());
        toast.success(data);
      }
    } catch (error) {
      dispatch(deleteUserFailure());
      toast.error(error.message);
      console.log(error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleDeleteUser}
      disabled={loading}
      className={`main-btn mt-0 bg-red-700 border-red-700 hover:text-red-700
      ${loading && "cursor-not-allowed opacity-50"}`}
    >
      Delete Account
    </button>
  );
};

export default DeleteAccount;
