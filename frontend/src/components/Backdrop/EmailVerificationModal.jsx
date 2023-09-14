/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import Backdrop from "./Backdrop";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

// eslint-disable-next-line no-unused-vars
const EmailVerificationModal = ({
  setEmailVerificationModal,
  userEmail,
  setEmailverified,
}) => {
  const { register, handleSubmit } = useForm();
  const [emailVerificationOTP, setEmailVerificationOTP] = useState(0);
  const isMailSent = useRef(false);

  const sendEmail = async (email) => {
    const res = await fetch(`/api/sendemail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setEmailVerificationOTP(data.otp);
    } else {
      toast.error("Unable to send email", {
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    if (isMailSent.current) return;
    isMailSent.current = true;
    sendEmail(userEmail);
  }, []);

  const formSubmit = (data, e) => {
    if (Number(data.otp) === emailVerificationOTP) {
      e.target.reset();
      setEmailVerificationModal(false);
      setEmailverified(true);
    } else {
      toast.error("Invalid otp", {
        autoClose: 2000,
      });
    }
  };
  const backdropDivVarient = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
    },
  };
  return (
    <Backdrop>
      <AnimatePresence mode="wait">
        <motion.div
          variants={backdropDivVarient}
          initial="hidden"
          animate="visible"
          exit="exit"
          className=" w-[350px] sm:min-w-[450px] sm:w-[450px]  h-auto p-2 flex flex-col justify-center bg-white z-30 rounded-lg"
        >
          <div className="flex flex-col px-4 py-4 gap-4">
            <div className="flex justify-between items-center">
              <p className="text-2xl font-medium text-[rgb(255,102,0)] ">
                Verify Email
              </p>
              <RxCross2
                color="rgb(255,102,0)"
                size={20}
                className="cursor-pointer"
                onClick={() => {
                  setEmailVerificationModal(false);
                  setEmailverified(false);
                }}
              />
            </div>
            <form
              onSubmit={handleSubmit(formSubmit)}
              className="flex flex-col justify-center  w-full"
            >
              <div className="text-gray-500 w-full text-center ">
                <p>
                  {" "}
                  Verification code has been sent to your email,{" "}
                  <span className="text-[rgb(255,102,0)]">{userEmail}</span>,
                  please enter the same here to complete the signup. Valid for
                  10 minutes.
                </p>
              </div>
              <input
                className="border my-4 p-2 outline-none bg-[#f1f1f1] rounded-sm"
                type="number"
                placeholder="OTP"
                {...register("otp", { required: true })}
              />
              <button
                className="border my-4 p-2 outline-none bg-[rgb(255,182,70)] text-white rounded-sm"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </motion.div>
      </AnimatePresence>
    </Backdrop>
  );
};

export default EmailVerificationModal;
