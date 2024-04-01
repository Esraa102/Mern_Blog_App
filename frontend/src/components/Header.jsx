import { Link, NavLink } from "react-router-dom";
import { navbarLinks } from "../constants";
import { useSelector } from "react-redux";
import LogOut from "./LogOut";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="text-white z-10 fixed backdrop-blur-md top-0 left-0 w-full">
      <div className="container mx-auto p-4 flex gap-4 items-center justify-between">
        <Link to={"/"} className="text-2xl font-bold">
          AUTH APP
        </Link>
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-4">
            {navbarLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.router}
                  className={({ isActive }) =>
                    `text-lg font-semibold hover:text-main transition ${
                      isActive && "text-main"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          {currentUser ? (
            <LogOut />
          ) : (
            <NavLink
              to={"/login"}
              className={({ isActive }) =>
                `text-lg font-semibold hover:text-main transition ${
                  isActive && "text-main"
                }`
              }
            >
              Sign In
            </NavLink>
          )}
          {currentUser && (
            <Link to={`/profile/${currentUser._id}`}>
              <img
                src={currentUser.imgProfile}
                alt="profile-img"
                className="w-[55px] h-[55px] rounded-full"
              />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
