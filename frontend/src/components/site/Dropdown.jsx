import { useContext } from 'react'
import { Context } from '../../App'
import { BsPersonCircle } from 'react-icons/bs'
import { AiOutlineLogout } from 'react-icons/ai'
import {motion,AnimatePresence} from 'framer-motion'

const Dropdown = () => {
    const { userDropdownOptions,setUserDropdownOptions } = useContext(Context);
    const handleLogout =()=>{
        setUserDropdownOptions(false);
        localStorage.removeItem('token');
        window.location.reload();
    }
    return (
        <>
            {
                userDropdownOptions ?

                   <AnimatePresence mode='wait'>
                   <motion.div 
                        initial={{opacity:0,scale:0 }}
                        animate={{opacity:1,scale:1}}
                        exit={{opacity:0,scale:0}}
                        className=' hidden md:flex shadow-xl bg-white rounded-lg absolute right-20 overflow-hidden'
                    >
                        <div className='flex flex-col'>
                            <div className='flex gap-2 px-8 py-2 w-full justify-center items-center  cursor-pointer hover:bg-gray-200'>
                                <BsPersonCircle color='gray ' />
                                <p className='text-gray-500'>Profile</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className='flex gap-2 p-2 w-full justify-center items-center cursor-pointer hover:bg-gray-200'

                             >
                                <AiOutlineLogout color='gray ' />
                                <p className='text-gray-500'>Logout</p>
                            </button>
                        </div>
                    </motion.div>
                   </AnimatePresence>

                    :
                    <div></div>
            }
        </>
    )
}

export default Dropdown
