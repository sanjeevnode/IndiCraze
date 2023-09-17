import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    setIsLoggedIn(!isLoggedIn);
    sessionStorage.removeItem("isLoggedIn");
  };

  return (
    <div className="fixed bg-white z-10 w-full h-[50px] border-b border-gray-100 md:px-16 flex p-1 justify-between items-center  ">
      <div>
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "shadow-xl z-20 rounded-md" : ""
          }
        >
          <p className="md:text-3xl text-xl font-light text-[rgb(252,108,0)]">
            IndiCraze Admin
          </p>
        </NavLink>
      </div>
      <div>
        {isLoggedIn ? (
          <div className="flex gap-2 px-2 justify-center items-center">
            <NavLink
              to="/additem"
              className={({ isActive }) =>
                isActive ? "shadow-xl z-20 rounded-md" : ""
              }
            >
              <p className="md:text-2xl text-[12px] font-light  text-[rgb(252,108,0)] hover:shadow-xl p-2  cursor-pointer rounded-md">
                Add item
              </p>
            </NavLink>

            <p
              onClick={handleLogout}
              className="md:text-2xl font-light text-[12px]  text-[rgb(252,108,0)] hover:shadow-xl p-2 cursor-pointer rounded-md"
            >
              Logout
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
