/* eslint-disable react/prop-types */
import { useContext } from "react";
import { RxCross1 } from "react-icons/rx";
import { Context } from "../../App";
import { toast } from "react-toastify";
const CartItem = ({ item }) => {
  const { setCart, TotalPrice, token, setIsLoading } = useContext(Context);
  const removeCartItem = async () => {
    await fetch(
      `https://server-indicraze.onrender.com/api/cart/delete/${item._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.current}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        setCart(response.items);
        TotalPrice.current = response.totalPrice;
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message, {
          autoClose: 500,
        });
      });
  };
  const handleRemoveItem = async () => {
    setIsLoading(true);
    await removeCartItem();
  };
  return (
    <>
      <div className="relative w-full grid grid-cols-3 p-2 gap-1 md:gap-4 cartitem-shadow rounded-sm">
        <div className="w-full flex justify-center items-center">
          <img
            className=" w-16 h-16 md:w-20 md:h-20  rounded-full"
            src={item.image}
            alt={item.name}
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <p className="text-[11px] md:text-[18px] font-light text-gray-800">
            {item.name}
          </p>
        </div>
        <div className="w-full flex justify-center items-center">
          <p className="text-[11px] md:text-[18px] font-light text-gray-800">
            Rs. {item.price}
          </p>
        </div>

        <RxCross1
          onClick={handleRemoveItem}
          className="absolute right-0 top-0 text-[13px] md:text-[20px] cursor-pointer hover:border rounded-s text-red-400"
        />
      </div>
    </>
  );
};

export default CartItem;
