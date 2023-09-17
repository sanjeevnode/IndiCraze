import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const location = useLocation();

  const updateItem = async (data) => {
    const res = await fetch(
      `https://server-indicraze.onrender.com/api/fooditem/update/${location.state.item._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return res;
  };

  const formSubmit = async (data, e) => {
    const res = await updateItem(data);
    if (res.ok) {
      e.target.reset();
      navigate("/home", { replace: true });
    } else {
      const result = await res.json();
      alert(result.message);
    }
  };
  return (
    <div className="w-full h-full  flex justify-center items-center">
      <div className="md:min-w-[70%]  w-full md:w-[70%]  flex flex-col justify-center h-full md:h-full items-center  p-4">
        <form
          action=""
          onSubmit={handleSubmit(formSubmit)}
          className="md:min-w-[90%] md:w-[90%] w-full gap-4 flex flex-col md:shadow-md md:p-8 p-2 "
        >
          <div>
            <p className="px-2 text-2xl font-thin text-gray-500">
              Edit Food Items
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 md:flex-row">
            <div className="flex gap-4 flex-col w-full">
              <img
                src={location.state.item.imageURL}
                alt=""
                className="w-full h-[278px] rounded-md"
              />

              <input
                className="outline-none bg-[#f1f1f1] px-2 md:px-4 py-2 rounded-md text-gray-500"
                type="text"
                placeholder="name"
                {...register("name", { required: true })}
                defaultValue={location.state.item.name}
              />
            </div>
            <div className="w-full flex flex-col gap-4">
              <textarea
                className="outline-none bg-[#f1f1f1] px-2 md:px-4 py-2 rounded-md text-gray-500 resize-none"
                type="text"
                placeholder="description"
                {...register("description", { required: true })}
                defaultValue={location.state.item.description}
                rows={4}
              />

              <input
                className="outline-none bg-[#f1f1f1] px-2 md:px-4 py-2 rounded-md text-gray-500"
                type="number"
                placeholder="price"
                {...register("price", { required: true })}
                defaultValue={location.state.item.price}
              />

              <input
                className="outline-none bg-[#f1f1f1] px-2 md:px-4 py-2 rounded-md text-gray-500"
                type="text"
                placeholder="quantity"
                {...register("quantity", { required: true })}
                defaultValue={location.state.item.quantity}
              />

              <select
                className="outline-none bg-[#f1f1f1] px-2 md:px-4 py-2 rounded-md text-gray-500 cursor-pointer"
                {...register("category", { required: true })}
                defaultValue={location.state.item.category}
              >
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non Vegetarian</option>
                <option value="beverages">Beverages</option>
                <option value="breads">Breads</option>
              </select>

              <input
                className="outline-none bg-[#f1f1f1] px-2 md:px-4 py-2 rounded-md text-gray-500"
                type="text"
                placeholder="imageURL"
                {...register("imageURL", { required: true })}
                defaultValue={location.state.item.imageURL}
              />
            </div>
          </div>

          <div className="w-full flex justify-center items-center">
            <button
              className="bg-[#FFA41B] py-2  px-8  rounded-md border-none  w-fit outline-none text-white"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
