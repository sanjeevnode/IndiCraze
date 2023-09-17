import React from "react";
import { useNavigate } from "react-router-dom";

const Section = ({ ele, i }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/update", { state: { item: ele } });
  };
  return (
    <div
      key={i}
      className="flex flex-col  w-full p-2 rounded-2xl shadow-md hover:scale-105 duration-300 cursor-pointer mt-4 "
    >
      <img src={ele.imageURL} alt="" className="w-full h-[180px] rounded-2xl" />
      <div className="flex w-full justify-between">
        <p className="text-gray-500 font-light">{ele.name}</p>
        <p className="text-gray-500 font-light">₹{ele.price}</p>
      </div>
      <div className="flex w-full justify-between">
        <p className="text-gray-500 font-light">{ele.quantity} </p>
        <button
          onClick={handleEdit}
          className="bg-[#FFA41B] text-white font-medium py-1 px-4 rounded-md text-center"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Section;
