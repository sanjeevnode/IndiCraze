import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BiEdit } from "react-icons/bi";
import { Context } from "../../App";
import { toast } from "react-toastify";

const PersonalDetails = () => {
  const [inputDisabled, setInputDisabled] = useState(true);
  const { register, handleSubmit } = useForm();
  const { currentUser, token, setCurrentUser } = useContext(Context);

  const updateUserDetails = async (data) => {
    await fetch(`/api/user/profile`, {
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
        toast.success("Updated Successfully", {
          autoClose: 500,
        });
        // window.location.reload();
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
        className="flex flex-col gap-6 p-4 md:p-8 w-full md:w-[70%] "
      >
        <div className=" flex justify-between items-center py-2">
          <p className="text-[rgb(255,102,0)] text-[15px] md:text-2xl font-light">
            Personal Information
          </p>

          <BiEdit
            size={30}
            color="rgb(255,182,70)"
            onClick={() => setInputDisabled(false)}
            className="cursor-pointer  hover:border border-gray-200 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] text-gray-500">Email</label>
          <input
            className="border p-2 outline-none rounded-sm"
            type="email"
            disabled
            placeholder="Email"
            {...register("email")}
            defaultValue={currentUser.email}
          />
          <p className="text-[10px] text-gray-500 w-full text-end">
            Not Editable
          </p>
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] text-gray-500">Name</label>
          <input
            className="border p-2 outline-none rounded-sm"
            type="text"
            disabled={inputDisabled}
            placeholder="Name"
            {...register("name")}
            defaultValue={currentUser.name}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] text-gray-500">Mobile No.</label>
          <input
            className="border p-2 outline-none rounded-sm"
            type="number"
            disabled={inputDisabled}
            placeholder="Mobile No."
            {...register("mobile")}
            defaultValue={currentUser.mobile}
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

export default PersonalDetails;
