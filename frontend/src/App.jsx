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
import Cart from "./components/site/Cart";
import ScrollToTop from "./components/site/ScrollToTop";

const Context = createContext();

function App() {
  const [loginBackdrop, setLoginBackdrop] = useState(false); // login and register
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false); // current
  const [userDropdownOptions, setUserDropdownOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = useRef(localStorage.getItem("token") || "");
  const [cart, setCart] = useState([]);
  const TotalPrice = useRef(0);
  const [scrollToTop, setScrollToTop] = useState(false);

  const getUser = async (token) => {
    await fetch(`https://server-indicraze.onrender.com/api/user/profile`, {
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
        getCart(token);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const clearCart = async () => {
    return await fetch(
      `https://server-indicraze.onrender.com/api/cart/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.current}`,
        },
      }
    );
  };

  const getCart = async (token) => {
    await fetch(`https://server-indicraze.onrender.com/api/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to get Cart");
        }
        return response.json();
      })
      .then((response) => {
        setCart(response.items || []);
        TotalPrice.current = response.totalPrice || 0;
        setIsLoggedIn(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (token.current) {
      setIsLoading(true);
      getUser(token.current);
    }
    AOS.init();

    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setScrollToTop(true);
      } else {
        setScrollToTop(false);
      }
    });
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
        setCart,
        cart,
        TotalPrice,
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
          <Route
            path="/cart"
            element={token.current ? <Cart /> : <Navigate to="/" />}
          />
        </Routes>

        {scrollToTop && <ScrollToTop />}
      </div>
    </Context.Provider>
  );
}

export { Context };
export default App;
