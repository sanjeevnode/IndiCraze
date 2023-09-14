/* eslint-disable react/prop-types */

import { useContext } from "react";
import { Context } from "../../App";
import { toast } from "react-toastify";
import "aos/dist/aos.css";

// import { useNavigate } from 'react-router-dom'

const Section = ({ ele, i }) => {
  const { isLoggedIn, setLoginBackdrop, currentUser, setIsLoading } =
    useContext(Context);

  const addToCart = async () => {
    await fetch(`/api/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: currentUser._id,
        item: {
          _id: ele._id,
          name: ele.name,
          price: ele.price,
          image: ele.imageURL,
          category: ele.category,
        },
      }),
    }).then((response) => {
      if (response.ok) {
        setIsLoading(false);
        toast.success(`item added to cart `, {
          autoClose: 500,
        });
      } else {
        toast.error(`something went wrong `, {
          autoClose: 500,
        });
      }
    });
  };

  const handleOrderNow = async () => {
    if (isLoggedIn) {
      setIsLoading(true);
      await addToCart();
    } else {
      setLoginBackdrop(true);
    }
  };
  // const navigate = useNavigate();
  return (
    <div
      key={i}
      data-aos="zoom-in-up"
      // data-aos-delay={i*50}
      className="flex flex-col gap-1 w-full p-3 md:p-4 box-shadow bg-white hover:bg-white rounded-2xl  transition duration-300 cursor-pointer "
    >
      <img
        src={ele.imageURL}
        alt=""
        className="w-full h-[150px] md:h-[200px]  rounded-xl "
      />
      <div className="flex w-full justify-between">
        <p className="text-gray-800 text-[12px] md:text-[18px] font-light">
          {ele.name}
        </p>
        <p className="text-gray-600 text-[12px] md:text-[18px] font-light">
          ₹ {ele.price}
        </p>
      </div>
      {/* <div>
            <p className='text-gray-600 text-[10px] md:text-[12px] font-light'>{ ele.description }</p>
            </div> */}
      <div className=" flex justify-between items-center w-full">
        <p className="text-gray-600 text-[10px] md:text-[12px] font-light">
          {ele.quantity} for one
        </p>

        <button
          onClick={handleOrderNow}
          className=" text-center text-[10px] md:text-[12px]  px-1 py-1  rounded-[10px] bg-orange-100 hover:bg-orange-200 text-[#ff6600]"
        >
          Order now
        </button>
      </div>
    </div>
  );
};

export default Section;
