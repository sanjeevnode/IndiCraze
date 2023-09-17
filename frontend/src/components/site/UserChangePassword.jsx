import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BiEdit } from "react-icons/bi";
import { toast } from "react-toastify";
import { Context } from "../../App";

const UserChangePassword = () => {
  const [inputDisabled, setInputDisabled] = useState(true);
  const [showpassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();
  const { token, setCurrentUser, setIsLoading, clearCart } =
    useContext(Context);

  const updatepassword = async (formData) => {
    await fetch(`/api/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.current}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid data");
        }
        return response.json();
      })
      .then((responseData) => {
        setCurrentUser(responseData);

        // window.location.reload();
      })
      .catch((error) => {
        toast.error(error.message, {
          autoClose: 500,
        });
      });
  };

  const handleLogout = async () => {
    setIsLoading(true);
    await clearCart().then((response) => {
      if (response.ok) {
        setIsLoading(false);
        localStorage.removeItem("token");
        window.location.reload();
      } else {
        setIsLoading(false);
        toast.error("Unable to log out", {
          autoClose: 2000,
        });
      }
    });
  };

  const formSubmit = async (data) => {
    if (data.password === data.confirmPassword) {
      await updatepassword(data).then(async () => {
        await handleLogout();
      });
    } else {
      toast.error("Passwords do not match", {
        autoClose: 500,
      });
    }
  };
  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit(formSubmit)}
        className="flex flex-col gap-6 p-4 md:p-8 w-full md:w-[70%] "
      >
        <div className=" flex justify-between items-center py-2">
          <p className="text-[rgb(255,102,0)] text-[15px] md:text-2xl font-light">
            Change Password
          </p>

          <BiEdit
            size={30}
            color="rgb(255,182,70)"
            onClick={() => setInputDisabled(false)}
            className="cursor-pointer  hover:border border-gray-200 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] text-gray-500">New Password</label>
          <input
            className="border p-2 outline-none  rounded-sm"
            type={showpassword ? "text" : "password"}
            disabled={inputDisabled}
            placeholder="new password"
            {...register("password", { required: true })}
            autoComplete="new-password"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] text-gray-500">Confirm Password</label>
          <input
            className="border p-2 outline-none  rounded-sm"
            type={showpassword ? "text" : "password"}
            disabled={inputDisabled}
            placeholder="confirm password"
            {...register("confirmPassword", { required: true })}
            autoComplete="confirm-password"
          />
        </div>

        <div className="flex gap-2 w-fit ">
          <input
            className="cursor-pointer"
            type="checkbox"
            checked={showpassword}
            onChange={() => setShowPassword(!showpassword)}
          />
          <p className="text-gray-500">show password</p>
        </div>

        <div className="w-full">
          <button className="w-full p-2 outline-none bg-[rgb(255,182,70)] text-white rounded-sm">
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};

export default UserChangePassword;
