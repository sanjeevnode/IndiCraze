import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BiEdit } from "react-icons/bi";
import { Context } from "../../App";
import { toast } from "react-toastify";

const UserAddress = () => {
  const [inputDisabled, setInputDisabled] = useState(true);
  const { currentUser, token, setCurrentUser } = useContext(Context);

  const { register, handleSubmit } = useForm();

  const updateUserDetails = async (data) => {
    await fetch(`https://server-indicraze.onrender.com/api/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.current}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(" Invalid Data");
        }
        return response.json();
      })
      .then((responseData) => {
        setCurrentUser(responseData);
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.message, {
          autoClose: 2000,
        });
      });
  };

  const formSubmit = async (data) => {
    await updateUserDetails(data).then(() => {
      setInputDisabled(true);
    });
  };
  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit(formSubmit)}
        className="flex flex-col gap-6  p-4 md:p-8 w-full md:w-[70%] "
      >
        <div className=" flex justify-between items-center py-2">
          <p className="text-[rgb(255,102,0)] text-[15px] md:text-2xl font-light">
            Address
          </p>

          <BiEdit
            size={30}
            color="rgb(255,182,70)"
            onClick={() => setInputDisabled(false)}
            className="cursor-pointer  hover:border border-gray-200 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[10px] text-gray-500">State*</label>
          <input
            className="border p-2 outline-none  rounded-sm"
            type="text"
            disabled={inputDisabled}
            placeholder="state"
            {...register("state", { required: true })}
            defaultValue={currentUser.state}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] text-gray-500">City*</label>
          <input
            className="border p-2 outline-none  rounded-sm"
            type="text"
            disabled={inputDisabled}
            placeholder="City"
            {...register("city", { required: true })}
            defaultValue={currentUser.city}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] text-gray-500">Pincode*</label>
          <input
            className="border p-2 outline-none  rounded-sm"
            type="number"
            disabled={inputDisabled}
            placeholder="Pincode"
            {...register("pincode", { required: true })}
            defaultValue={currentUser.pincode}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] text-gray-500">Address*</label>
          <textarea
            className="border p-2 outline-none  rounded-sm resize-none"
            type="number"
            disabled={inputDisabled}
            placeholder="street/house/floor no."
            {...register("address", { required: true })}
            rows={4}
            defaultValue={currentUser.address}
          />
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

export default UserAddress;
