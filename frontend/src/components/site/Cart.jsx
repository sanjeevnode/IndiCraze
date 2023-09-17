import { useContext } from "react";
import Header from "./Header";
import CartItem from "./CartItem";
import { Context } from "../../App";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
const Cart = () => {
  const { cart, TotalPrice, token, setIsLoading } = useContext(Context);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const stripe = await loadStripe(
        "pk_test_51NrHSHSHL4Plemd0CfHategsOnsUXk91afhDbhQ7NShwDG56fJVbO5bri1MSXnpFxRWW6bIgCsrXvJD5RaBhLt4H001uQwVMng"
      );

      const response = await fetch(
        `https://server-indicraze.onrender.com/api/payment`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.current}`,
          },
        }
      );

      const sesssion = await response.json();

      if (sesssion.id) {
        await fetch(`https://server-indicraze.onrender.com/api/cart/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.current}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              setIsLoading(false);
              stripe.redirectToCheckout({
                sessionId: sesssion.id,
              });
            } else {
              throw new Error("Unable to process request");
            }
          })
          .catch((error) => {
            toast.error(error.message, {
              autoClose: 600,
            });
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Header text={"Cart"} />
      <div className=" flex justify-center  w-full h-[94%] p-4">
        <div className=" w-full md:min-w-[70%] lg:w-[70%] md:w-[70%] max-h-full h-fit  flex flex-col cartitem-shadow">
          <div className=" h-[8%] w-full p-2 flex items-center border-b border-[rgb(252,102,0)]">
            <p className="text-2xl md:text-3xl text-gray-500 font-light">
              Items in Cart
            </p>
          </div>
          <div className="  w-full h-[84%] flex flex-col overflow-y-auto p-3 md:p-4 gap-4 ">
            {TotalPrice.current > 0 ? (
              cart.map((item, index) => {
                return <CartItem key={index} item={item} />;
              })
            ) : (
              <div className=" w-full flex  justify-center items-center h-full">
                <p className="text-4xl text-gray-200 font-light">
                  Nothing in Cart ...
                </p>
              </div>
            )}
          </div>
          <div className="  w-full h-[8%] border-t border-[rgb(252,102,0)] grid grid-cols-2 gap-1">
            <div className="w-full flex justify-center items-center p-2 ">
              <button
                onClick={handlePayment}
                className="outline-none bg-[rgb(255,182,70)] text-white md:p-2 p-1 text-xl  w-full"
              >
                Payment
              </button>
            </div>
            <div className="w-full p-2 flex justify-center items-center">
              <div className="flex justify-center items-center gap-2 md:gap-4 bg-gray-100 md:p-2 p-1 w-full">
                <p className="text-xl text-gray-500 ">Total :</p>
                <p className="text-xl text-[rgb(250,102,0)] ">
                  ₹ {TotalPrice.current}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
