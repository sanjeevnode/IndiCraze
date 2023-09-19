/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../App";
import { toast } from "react-toastify";

const Login = ({ setToggleRegister }) => {
  const {
    setLoginBackdrop,
    setIsLoggedIn,
    setCurrentUser,
    token,
    setIsLoading,
  } = useContext(Context);
  const [showpassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  // const [isLoading, setIsLoading] = useState(true);

  const loginUser = async (data) => {
    return await fetch(`http://localhost:5000/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const formSubmit = async (data, e) => {
    setIsLoading(true);
    await loginUser({
      email: data.email,
      password: data.password,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(" Invalid email or password");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        token.current = data.token;
        setLoginBackdrop(false);
        setCurrentUser({
          _id: data._id,
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          address: data.address,
          state: data.state,
          city: data.city,
          pincode: data.pincode,
        });

        setIsLoading(false);
        setIsLoggedIn(true);
        e.target.reset();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message, {
          autoClose: 1000,
        });
      });
  };
  return (
    <div className="flex flex-col px-6 py-6 gap-2">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-medium text-[rgb(255,102,0)] ">Login</p>
        <RxCross2
          color="rgb(255,102,0)"
          size={20}
          className="cursor-pointer"
          onClick={() => {
            setLoginBackdrop(false);
          }}
        />
      </div>
      <form
        onSubmit={handleSubmit(formSubmit)}
        action=""
        className="flex flex-col justify-center   w-full"
      >
        <input
          className="border my-4 p-2 outline-none bg-[#f1f1f1] rounded-sm"
          type="text"
          name=""
          id=""
          placeholder="email"
          {...register("email", { required: true })}
        />

        <input
          className="border my-4 p-2 outline-none bg-[#f1f1f1] rounded-sm"
          type={showpassword ? "text" : "password"}
          name=""
          id=""
          placeholder="password"
          {...register("password", { required: true })}
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
          Login
        </button>
      </form>
      <div className="">
        <p className="text-gray-500">
          New to IndiCraze?{" "}
          <span
            onClick={() => setToggleRegister(true)}
            className="text-[rgb(255,102,0)] cursor-pointer"
          >
            Create account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
