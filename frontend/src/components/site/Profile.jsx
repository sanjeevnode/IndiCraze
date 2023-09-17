import profileIcon from "../../assets/profile.png";
import UserAddress from "./UserAddress";
import UserChangePassword from "./UserChangePassword";
import PersonalDetails from "./personalDetails";
import { NavLink, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { MdPassword } from "react-icons/md";
import { LiaAddressCard } from "react-icons/lia";
import { BsFillPersonLinesFill } from "react-icons/bs";
import "aos/dist/aos.css";
import Header from "./Header";
import { useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/profile/personalDetails");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {/* Profile navbar */}

      <Header text={"Profile"} />
      <div className=" flex justify-center items-center h-[90%] ">
        <div className="  md:min-w-[70%] md:w-[70%] w-[95%] p-2 h-full flex flex-col gap-4 mt-10 md:mt-4 ">
          {/* main container */}

          <div className=" flex flex-col md:flex-row gap-6 md:gap-2 w-full  bg-white md:box-shadow justify-between py-6 md:py-0 h-full ">
            {/* side bar */}
            <div className="hidden md:flex min-w-[20%]  flex-col gap-10  py-10  px-4 border-r border-gray-200">
              <div className="flex justify-center items-center  p-4">
                <div className="border p-6 rounded-[50%] bg-gray-200 ">
                  <img
                    src={profileIcon}
                    alt=""
                    className="min-w-[50px] md:max-w-[90px]"
                  />
                </div>
              </div>

              <NavLink to="personalDetails" className=" ">
                <button className="w-full p-4 flex justify-center items-center ">
                  <p className="text-gray-500">Personal Details</p>
                </button>
              </NavLink>

              <NavLink to="address" className=" ">
                <button className="w-full p-4 flex justify-center items-center ">
                  <p className="text-gray-500">Address</p>
                </button>
              </NavLink>

              <NavLink to="changePassword" className=" ">
                <button className="w-full p-4 flex justify-center items-center ">
                  <p className="text-gray-500">Change Password</p>
                </button>
              </NavLink>
            </div>

            {/* content */}
            <div className="w-full md:w-[80%]  flex justify-center items-start md:items-center h-fit md:h-full profile ">
              <Routes>
                <Route index element={<PersonalDetails />} />
                <Route path="personalDetails" element={<PersonalDetails />} />
                <Route path="address" element={<UserAddress />} />
                <Route path="changePassword" element={<UserChangePassword />} />
              </Routes>
            </div>

            <div className="md:hidden h-[50px] w-full flex justify-center items-center ">
              <div className=" flex gap-10 justify-center items-center bg-gray-50 py-3 px-6  rounded-lg mobile-active shadow-xl">
                <NavLink to="personalDetails">
                  <BsFillPersonLinesFill size={25} />
                </NavLink>

                <NavLink to="address">
                  <LiaAddressCard size={25} />
                </NavLink>

                <NavLink to="changePassword">
                  <MdPassword size={25} />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Profile;
