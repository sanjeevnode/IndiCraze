import { createContext, useEffect, useRef, useState } from "react"
import Navbar from "./components/site/Navbar"
import BackdropLoginRegistration from "./components/users/BackdropLoginRegistration";
import Home from "./components/site/Home";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dropdown from "./components/site/Dropdown";



const Context = createContext();

function App() {
  const [backdrop, setBackdrop] = useState(false); // login and register
  const [currentUser, setCurrentUser] = useState({});
  const isLoggedIn = useRef(false);
  const [userDropdownOptions, setUserDropdownOptions] = useState(false);



  const getUser = async (token) => {
    await fetch(`http://localhost:5000/api/user/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Unable to get userData");
      }
      return response.json();
    }).then((response) => {
      setCurrentUser(response);
      isLoggedIn.current = true;
    }).catch((error) => {
      console.error(error.message);
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUser(token);
    }
  }, [])

  return (
    <Context.Provider value={ {
      backdrop,
      setBackdrop,
      currentUser,
      setCurrentUser,
      isLoggedIn,
      setUserDropdownOptions,
      userDropdownOptions
    } }>
      <div className='w-full h-screen  '>
        <BackdropLoginRegistration />
        <Navbar />
        <Dropdown />
        <ToastContainer className='hidden md:block'/>
        <Home />
      </div>
    </Context.Provider>
  )
}

export { Context }
export default App
