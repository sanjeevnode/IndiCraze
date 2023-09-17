/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../App";
import EmailVerificationModal from "../Backdrop/EmailVerificationModal";
import { toast } from "react-toastify";

const Register = ({ setToggleRegister }) => {
  const { setLoginBackdrop } = useContext(Context);
  const [emailverified, setEmailverified] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [showpassword, setShowPassword] = useState(false);
  const [emailVerificationModal, setEmailVerificationModal] = useState(false);
  const {
    register: verifyRegister,
    handleSubmit: verifyFormHandleSubmit,
    formState: { errors },
  } = useForm();
  const { register: userRegister, handleSubmit: userFormHandleSubmit } =
    useForm();

  // const [isLoading, setIsLoading] = useState(true);

  const registerUser = async (data) => {
    return await fetch(`/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const verifyFormSubmit = (data, e) => {
    setEmailverified(true);
    setUserDetails(data);
    setEmailVerificationModal(true);
    e.target.reset();
  };

  const registerFormSubmit = async (data, e) => {
    if (data.password === data.confirmpassword) {
      const userData = {
        ...userDetails,
        password: data.password,
      };

      const res = await registerUser(userData);
      const resData = await res.json();

      if (res.ok) {
        setToggleRegister(false);
        e.target.reset();
      } else {
        setEmailverified(false);
        toast.error(resData.message, {
          autoClose: 3000,
        });
        e.target.reset();
      }
    } else {
      toast.error("Passwords do not match", {
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      {emailVerificationModal && (
        <EmailVerificationModal
          setEmailVerificationModal={setEmailVerificationModal}
          userEmail={userDetails.email}
          setEmailverified={setEmailverified}
        />
      )}
      <div className="flex flex-col px-6 py-6 gap-2">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-medium text-[rgb(255,102,0)] ">
            Register
          </p>
          <RxCross2
            color="rgb(255,102,0)"
            size={20}
            className="cursor-pointer"
            onClick={() => {
              setLoginBackdrop(false);
              setToggleRegister(false);
              setEmailverified(false);
              setUserDetails({});
            }}
          />
        </div>
        <div className="flex flex-col justify-center  w-full">
          {emailverified ? (
            <form
              onSubmit={userFormHandleSubmit(registerFormSubmit)}
              className="flex flex-col justify-center  w-full"
            >
              <input
                className="border my-4 p-2 outline-none bg-[#f1f1f1] rounded-sm"
                type={showpassword ? "text" : "password"}
                name=""
                id=""
                placeholder="password"
                {...userRegister("password", { required: true })}
              />
              <input
                className="border my-4 p-2 outline-none bg-[#f1f1f1] rounded-sm"
                type={showpassword ? "text" : "password"}
                name=""
                id=""
                placeholder="confirm password"
                {...userRegister("confirmpassword", { required: true })}
              />
              <div className="flex gap-2 p-2 w-fit ">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  checked={showpassword}
                  onChange={() => setShowPassword(!showpassword)}
                />
                <p>show password</p>
              </div>
              <button
                className="border my-4 p-2 outline-none bg-[rgb(255,182,70)] text-white rounded-sm"
                type="submit"
              >
                Register
              </button>
            </form>
          ) : (
            <form
              onSubmit={verifyFormHandleSubmit(verifyFormSubmit)}
              className="flex flex-col justify-center  w-full"
            >
              <input
                className="border my-4 p-2 outline-none bg-[#f1f1f1] rounded-sm"
                type="text"
                name=""
                id=""
                placeholder="name"
                {...verifyRegister("name", { required: true })}
              />
              <input
                className="border my-4 p-2 outline-none bg-[#f1f1f1] rounded-sm"
                type="text"
                name=""
                id=""
                placeholder="email"
                {...verifyRegister("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-[12px]">Invalid email</span>
              )}
              <button
                className="border my-4 p-2 outline-none bg-[rgb(255,182,70)] text-white rounded-sm"
                type="submit"
              >
                Continue
              </button>
            </form>
          )}
        </div>
        <div className="">
          <p className="text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => setToggleRegister(false)}
              className="text-[rgb(255,102,0)] cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
