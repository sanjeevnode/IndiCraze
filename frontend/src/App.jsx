import { createContext, useEffect, useRef, useState } from "react";
import BackdropLoginRegistration from "./components/users/BackdropLoginRegistration";
import Home from "./components/site/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropdown from "./components/site/Dropdown";
import { Routes, Route, Navigate } from "react-router-dom";
import AOS from "aos";
import LoadingBackdrop from "./components/Backdrop/LoadingBackdrop";
import Profile from "./components/site/Profile";

const Context = createContext();

function App() {
  const [loginBackdrop, setLoginBackdrop] = useState(false); // login and register
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false); // current
  const [userDropdownOptions, setUserDropdownOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = useRef(localStorage.getItem("token") || "");

  const getUser = async (token) => {
    await fetch(`/api/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to get userData");
        }
        return response.json();
      })
      .then((response) => {
        setCurrentUser(response);
        setIsLoggedIn(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const clearCart = async () => {
    return await fetch(`/api/cart/${currentUser._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    if (token.current) {
      setIsLoading(true);
      getUser(token.current);
    }
    AOS.init();
  }, []);

  return (
    <Context.Provider
      value={{
        loginBackdrop,
        setLoginBackdrop,
        currentUser,
        setCurrentUser,
        isLoggedIn,
        setIsLoggedIn,
        setUserDropdownOptions,
        userDropdownOptions,
        isLoading,
        setIsLoading,
        clearCart,
        token,
      }}
    >
      <div className="w-full h-screen  ">
        <BackdropLoginRegistration />
        {isLoading && <LoadingBackdrop />}
        {/* <Navbar /> */}
        <Dropdown />
        <ToastContainer className="hidden md:block" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile/*"
            element={token.current ? <Profile /> : <Navigate to="/" />}
          />
          {/* <Route path='/profile' element={<Navigate to='/profile/personalDetails'/>}/> */}
        </Routes>
      </div>
    </Context.Provider>
  );
}

export { Context };
export default App;
