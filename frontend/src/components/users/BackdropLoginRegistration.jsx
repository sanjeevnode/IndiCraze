/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from 'framer-motion'
import Register from './Register';
import { useContext, useState } from 'react';
import Login from './Login';
import { Context } from '../../App';


const BackdropLoginRegistration = () => {
      const { backdrop } =useContext(Context);
    const [toggleRegister, setToggleRegister] = useState(false);
    const backdropVarient = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    }
    const backdropDivVarient = {
        hidden: {
            opacity: 0,
            scale: 0
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: .1,
                type: "spring",
                damping: 25,
                stiffness: 500
            }
        },
        exit: {
            opacity: 0,
            scale: 0,
        }
    };
    return (
        <AnimatePresence mode='wait'>
            {
                backdrop && (
                    <motion.div
                        className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-[rgb(0,0,0,.5)] z-10"
                        variants={ backdropVarient }
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            variants={ backdropDivVarient }
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className=' w-[350px] sm:min-w-[450px] sm:w-[450px]  h-auto p-2 flex flex-col justify-center bg-white z-30 rounded-lg'
                        >
                           {
                            toggleRegister ?
                            <Register  setToggleRegister={ setToggleRegister } />
                            :
                            <Login  setToggleRegister={ setToggleRegister } />
                           }
                        </motion.div>

                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default BackdropLoginRegistration
