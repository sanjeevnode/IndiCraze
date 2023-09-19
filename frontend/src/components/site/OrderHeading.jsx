import { motion } from "framer-motion";

const OrderHeading = () => {
  return (
    <>
      <motion.div
        initial={{ scale: 0.8, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
        }}
        className="w-full h-full rounded-md flex flex-col-reverse justify-evenly  bg-orange-50"
      >
        <div className="p-2 flex justify-center items-center">
          <motion.p
            initial={{ scale: 0, y: -400 }}
            whileHover={{
              scale: 0.8,
              rotate: 360,
              transition: {
                duration: 0.2,
              },
            }}
            animate={{
              rotate: 270,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: "easeIn",
            }}
            className=" text-6xl font-light text-[rgb(250,102,0)] cursor-pointer"
          >
            M
          </motion.p>
        </div>

        <div className="p-2 flex justify-center items-center">
          <motion.p
            initial={{ scale: 0, y: -400 }}
            whileHover={{
              scale: 0.8,
              rotate: 360,
              transition: {
                duration: 0.2,
                delay: 0,
              },
            }}
            animate={{ rotate: 270, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: "easeIn",
            }}
            className=" text-6xl font-light text-[rgb(250,102,0)] cursor-pointer"
          >
            Y
          </motion.p>
        </div>

        <div className="p-2 flex justify-center items-center">
          <motion.p
            initial={{ scale: 0, y: -400 }}
            whileHover={{
              scale: 0.8,
              rotate: 360,
              transition: {
                duration: 0.2,
                delay: 0,
              },
            }}
            animate={{ rotate: 270, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: "easeIn",
            }}
            className=" text-6xl font-light text-[rgb(250,102,0)] cursor-pointer"
          >
            {" "}
          </motion.p>
        </div>

        <div className="p-2 flex justify-center items-center">
          <motion.p
            initial={{ scale: 0, y: -400 }}
            whileHover={{
              scale: 0.8,
              rotate: 360,
              transition: {
                duration: 0.2,
                delay: 0,
              },
            }}
            animate={{ rotate: 270, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: "easeIn",
            }}
            className=" text-6xl font-light text-[rgb(250,102,0)] cursor-pointer"
          >
            O
          </motion.p>
        </div>

        <div className="p-2 flex justify-center items-center">
          <motion.p
            initial={{ scale: 0, y: -400 }}
            whileHover={{
              scale: 0.8,
              rotate: 360,
              transition: {
                duration: 0.2,
                delay: 0,
              },
            }}
            animate={{ rotate: 270, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: "easeIn",
            }}
            className=" text-6xl font-light text-[rgb(250,102,0)] cursor-pointer"
          >
            R
          </motion.p>
        </div>

        <div className="p-2 flex justify-center items-center">
          <motion.p
            initial={{ scale: 0, y: -400 }}
            whileHover={{
              scale: 0.8,
              rotate: 360,
              transition: {
                duration: 0.2,
                delay: 0,
              },
            }}
            animate={{ rotate: 270, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: "easeIn",
            }}
            className=" text-6xl font-light text-[rgb(250,102,0)] cursor-pointer"
          >
            D
          </motion.p>
        </div>

        <div className="p-2 flex justify-center items-center">
          <motion.p
            initial={{ scale: 0, y: -400 }}
            whileHover={{
              scale: 0.8,
              rotate: 360,
              transition: {
                duration: 0.2,
                delay: 0,
              },
            }}
            animate={{ rotate: 270, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: "easeIn",
            }}
            className=" text-6xl font-light text-[rgb(250,102,0)] cursor-pointer"
          >
            E
          </motion.p>
        </div>

        <div className="p-2 flex justify-center items-center">
          <motion.p
            initial={{ scale: 0, y: -400 }}
            whileHover={{
              scale: 0.8,
              rotate: 360,
              transition: {
                duration: 0.2,
                delay: 0,
              },
            }}
            animate={{ rotate: 270, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: "easeIn",
            }}
            className=" text-6xl font-light text-[rgb(250,102,0)] cursor-pointer"
          >
            R
          </motion.p>
        </div>

        <div className="p-2 flex justify-center items-center">
          <motion.p
            initial={{ scale: 0, y: -400 }}
            whileHover={{
              scale: 0.8,
              rotate: 360,
              transition: {
                duration: 0.2,
                delay: 0,
              },
            }}
            animate={{ rotate: 270, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: "easeIn",
            }}
            className=" text-6xl font-light text-[rgb(250,102,0)] cursor-pointer"
          >
            S
          </motion.p>
        </div>
      </motion.div>
    </>
  );
};

export default OrderHeading;
