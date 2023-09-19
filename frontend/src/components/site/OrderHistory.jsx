import { MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import OrderCard from "./OrderCard";
import OrderHeading from "./OrderHeading";
import { useContext } from "react";
import { Context } from "../../App";
import { toast } from "react-toastify";
const OrderHistory = () => {
  const { currentUser, token, setCurrentUser, setIsLoading } =
    useContext(Context);
  const navigate = useNavigate();
  const handleClearHistory = async () => {
    setIsLoading(true);
    await fetch(
      `https://server-indicraze.onrender.com/api/user/clear-order-history`,
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
          throw new Error("Unable to clear History");
        }
        return response.json();
      })
      .then((data) => {
        setCurrentUser(data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message, {
          autoClose: 800,
        });
      });
  };
  return (
    <>
      {/* Nav bar */}
      <div
        data-aos="fade-down"
        className="   flex  justify-between gap-2 md:gap-4 items-center px-3 md:px-8 w-full h-[45px] py-1 border-b border-gray-50 "
      >
        <div>
          <MdOutlineArrowBackIos
            size={20}
            className=" hover:border border-gray-100 rounded-md cursor-pointer"
            color="rgb(252,102,0)"
            onClick={() => {
              navigate("/", { replace: true });
            }}
          />
        </div>
        <div className="p-2">
          <button
            onClick={handleClearHistory}
            className="text-[12px] md:text-xl text-red-500 font-light px-2 py-1 bg-gray-50 rounded-md hover:bg-gray-100"
          >
            Clear History
          </button>
        </div>
      </div>

      <div className=" flex justify-center items-center h-[92%] ">
        <div className="  md:min-w-[70%] md:w-[70%] w-[95%] p-2 h-full flex flex-col gap-4 ">
          {/* main container */}

          <div className=" flex flex-col md:flex-row  w-full  bg-white md:box-shadow justify-start md:py-0 h-full ">
            {/* side bar */}
            <div className=" hidden md:flex min-w-[20%]  flex-col p-4 border-gray-200">
              <OrderHeading />
            </div>

            <div className="md:hidden flex w-full  items-center">
              <p className="px-2 text-xl text-gray-500 font-light">My Orders</p>
            </div>
            {/* content */}
            <div className="  w-full md:w-[80%] gap-4 flex  flex-col overflow-y-auto  my-4 profile px-2  h-[95%] ">
              {!currentUser.orderHistory ||
              currentUser.orderHistory.length === 0 ? (
                <div className="w-full h-full flex justify-center items-center ">
                  <p className="text-5xl text-gray-300">Nothing here...</p>
                </div>
              ) : (
                currentUser.orderHistory.map((order, index) => {
                  return <OrderCard key={index} order={order} />;
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
