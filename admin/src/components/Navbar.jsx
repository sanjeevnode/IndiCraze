import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    setIsLoggedIn(!isLoggedIn)
    sessionStorage.removeItem('isLoggedIn');
  };

  return (

    <div className=" fixed w-full h-[60px] border bg-[#FFA41B] md:px-16 flex p-1 justify-between items-center  ">
      <div>
      <NavLink to='/home' className={ ({ isActive }) =>
              isActive ? 'shadow-xl z-20 rounded-md' : ''
            }>
        <p className="md:text-3xl text-2xl font-light text-[#525FE1]" >IndiCraze Admin</p>
        </NavLink>
      </div>
      <div>

        { isLoggedIn ?
          <div className='flex gap-2 px-2 justify-center items-center'>
            <NavLink to='/additem' className={ ({ isActive }) =>
              isActive ? 'shadow-xl z-20 rounded-md' : ''
            }>
              <p className='md:text-2xl font-light  text-[#525FE1] hover:shadow-xl  p-2 cursor-pointer rounded-md'>Add item</p>
            </NavLink>

            <p onClick={ handleLogout } className='md:text-2xl font-light  text-[#525FE1] hover:shadow-xl  p-2 cursor-pointer rounded-md'>Logout</p>
          </div>
          : "" }

      </div>
    </div>
  )
}

export default Navbar
