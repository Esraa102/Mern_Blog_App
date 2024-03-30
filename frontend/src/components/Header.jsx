import { Link, NavLink } from "react-router-dom";
import { navbarLinks } from "../constants";

const Header = () => {
  const user = null;
  return (
    <header className="text-white fixed backdrop-blur-md top-0 left-0 w-full">
      <div className="container mx-auto py-6 px-4 flex gap-4 items-center justify-between">
        <Link to={"/"} className="text-2xl font-bold">
          BLOG
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
          {user && (
            <Link to={"/profile/"}>
              <img
                src=""
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
