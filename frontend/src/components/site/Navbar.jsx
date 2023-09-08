
import logo from '../../assets/cutlery.png';
import indicraze from '../../assets/indicraze.svg'
import { motion } from 'framer-motion'
import { useContext, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Context } from '../../App';

// eslint-disable-next-line react/prop-types
const Navbar = () => {
  const { setBackdrop, isLoggedIn, currentUser, userDropdownOptions, setUserDropdownOptions } = useContext(Context);
  const [nav, setNav] = useState(false);
  const handleLogout = () => {
    setUserDropdownOptions(false);
    setNav(false);
    localStorage.removeItem('token');
    window.location.reload();
  }

  const handleClick = () => setNav(!nav);
  return (
    <div>
      <div className="flex  justify-between px-3 md:px-8 w-full h-[60px] py-2 shadow-sm">
        {/* nav-logo / name */ }
        <div className='flex gap-1 md:p-1 justify-center '>
          <motion.img
            whileHover={ { scale: 1.1, rotate: 360 } }
            src={ logo }
            alt="IndiCraze"
            className='cursor-pointer w-[95%]' />
          <motion.img
            initial={ { y: -100, opacity: 0 } }
            animate={ { y: 0, opacity: 1 } }
            src={ indicraze }
            alt=""
            className='hidden md:block duration-150' />
        </div>
        {/* nav-links */ }
        <ul className='hidden md:flex justify-center items-center gap-4 md:p-1'>

          <li className='w-full'>
            {
              isLoggedIn.current ?
                <button onClick={ () => setUserDropdownOptions(!userDropdownOptions) }
                  className=' text-1xl  text-[#ff6600] font-light cursor-pointer  py-1 px-3 rounded-[20px] border border-gray-400 w-fit'>{ currentUser.name }</button>
                :
                <p onClick={ () => setBackdrop(true) }
                  className='text-1xl text-gray-500 font-light cursor-pointer  py-1 px-3 rounded-[20px] border border-gray-400 '>Login</p>
            }
          </li>
          <li>
            <AiOutlineShoppingCart size={ 30 } color='#ff9900' className='cursor-pointer ' />
          </li>
        </ul>

        {/* hamberger */ }
        <div onClick={ handleClick } className='md:hidden z-10'>
          { !nav ? <FaBars size={ 30 } color='#ff9900' /> : <FaTimes size={ 30 } color='#ff9900' /> }
        </div>


        <ul className={ !nav ? "hidden" : "absolute top-0 right-0 w-full h-screen bg-gradient-to-b from-[#f2edfc]  to-[#faf5f5] flex justify-center items-center flex-col gap-8" }>
          <li className='text-3xl'>
            <AiOutlineShoppingCart size={ 50 } color='#ff9900' />
          </li>
          <li className='text-3xl'>
            {
              isLoggedIn.current ?
                <p
                  className=' font-light  text-[#ff6600] cursor-pointer'>{ currentUser.name }</p>
                :
                <p onClick={ () => { setNav(!nav); setBackdrop(true) } }
                  className=' font-light text-gray-500 cursor-pointer'>Login</p>
            }
          </li>

          <li className='text-3xl'>
            <p className='font-light text-gray-500 cursor-pointer'>Profile</p>
          </li>

          <li className='text-3xl'>
            <button onClick={ handleLogout }
              className='font-light text-gray-500 cursor-pointer'>
              Logout
            </button>
          </li>
        </ul>

      </div>
    </div>
  )
}

export default Navbar
