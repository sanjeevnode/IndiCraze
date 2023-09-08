/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from 'framer-motion'

const Backdrop = ({ children }) => {
    const backdropVarient = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    }
   
    return (
        <AnimatePresence mode='wait'>

            <motion.div
                className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-[rgb(0,0,0,.6)] z-10"
                variants={ backdropVarient }
                initial="hidden"
                animate="visible"
            >
             
             {children}

            </motion.div>
           
        </AnimatePresence>
    )
}

export default Backdrop
