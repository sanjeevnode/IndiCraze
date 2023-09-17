import logo from "../../assets/cutlery.png";
import indicraze from "../../assets/indicraze.svg";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaBars, FaTimes } from "react-icons/fa";
import { Context } from "../../App";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Navbar = () => {
  const {
    setLoginBackdrop,
    isLoggedIn,
    currentUser,
    userDropdownOptions,
    setUserDropdownOptions,
    setIsLoading,
    clearCart,
    TotalPrice,
    cart,
  } = useContext(Context);

  const [nav, setNav] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await clearCart().then((response) => {
      if (response.ok) {
        setIsLoading(false);
        setUserDropdownOptions(false);
        setNav(false);
        localStorage.removeItem("token");
        window.location.reload();
      } else {
        setIsLoading(false);
        toast.error("Unable to log out", {
          autoClose: 2000,
        });
      }
    });
  };

  const handleClick = () => setNav(!nav);
  return (
    <div>
      <div
        data-aos="fade-down"
        className="  flex  justify-between px-3 md:px-8 w-full h-[60px] py-2 shadow-sm"
      >
        {/* nav-logo / name */}
        <div className="flex gap-2 md:p-1 justify-center ">
          <motion.img
            whileHover={{ scale: 1.1, rotate: -360 }}
            src={logo}
            alt="IndiCraze"
            className="cursor-pointer w-[95%]"
          />
          <motion.img
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            src={indicraze}
            alt=""
            className="hidden md:block cursor-pointer duration-150"
          />
        </div>
        {/* nav-links */}
        <ul className="hidden md:flex justify-center items-center gap-4 md:p-1">
          <li className="w-full">
            {isLoggedIn ? (
              <button
                onClick={() => setUserDropdownOptions(!userDropdownOptions)}
                className=" text-1xl  text-[#ff6600] font-light cursor-pointer  py-1 px-3 rounded-[20px] border border-gray-400 w-fit hover:outline hover:outline-gray-600"
              >
                {currentUser.name}
              </button>
            ) : (
              <p
                onClick={() => setLoginBackdrop(true)}
                className="text-1xl text-gray-500 font-light cursor-pointer  py-1 px-3 rounded-[20px] border border-gray-400 hover:outline hover:outline-gray-600"
              >
                Login
              </p>
            )}
          </li>
          <li className="relative p-1">
            <NavLink to="/cart">
              <AiOutlineShoppingCart
                size={30}
                color="#ff9900"
                className="cursor-pointer hover:border hover:outline-gray-200 rounded-md "
              />
            </NavLink>
            {TotalPrice.current > 0 && (
              <div className="absolute right-0 flex justify-center items-center top-0 bg-red-400 w-5 h-5 text-white text-[10px]  md:w-4 md:h-4 md:text-[8px] rounded-full">
                {cart.length}
              </div>
            )}
          </li>
        </ul>

        {/* hamberger */}
        <div onClick={handleClick} className="md:hidden z-20">
          {!nav ? (
            <FaBars size={30} color="#ff9900" />
          ) : (
            <FaTimes size={30} color="#ff9900" />
          )}
        </div>

        <ul
          className={
            !nav
              ? "hidden"
              : "absolute top-0 right-0 w-full h-screen bg-gradient-to-b from-[#f2edfc]  to-[#faf5f5] flex justify-center items-center flex-col gap-8 z-10"
          }
        >
          <li className="relative">
            <NavLink to="/cart">
              <AiOutlineShoppingCart
                size={50}
                color="#ff9900"
                className="hover:border hover:outline-gray-200 rounded-md"
              />
            </NavLink>
            {TotalPrice.current > 0 && (
              <div className="absolute right-0 flex justify-center items-center top-0 bg-red-400 w-5 h-5 text-white text-[10px] rounded-full">
                {cart.length}
              </div>
            )}
          </li>
          <li className="text-3xl">
            {isLoggedIn ? (
              <p className=" font-light  text-[#ff6600] cursor-pointer ">
                {currentUser.name}
              </p>
            ) : (
              <p
                onClick={() => {
                  setNav(!nav);
                  setLoginBackdrop(true);
                }}
                className=" font-light text-gray-500 cursor-pointer"
              >
                Login
              </p>
            )}
          </li>

          {isLoggedIn && (
            <li className="text-3xl">
              <NavLink to="/profile">
                <p className="font-light text-gray-500 cursor-pointer">
                  Profile
                </p>
              </NavLink>
            </li>
          )}

          {isLoggedIn && (
            <li className="text-3xl">
              <button
                onClick={handleLogout}
                className="font-light text-gray-500 cursor-pointer"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
