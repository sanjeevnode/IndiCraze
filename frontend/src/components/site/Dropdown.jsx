import { useContext } from "react";
import { Context } from "../../App";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineLogout, AiOutlineHistory } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dropdown = () => {
  const navigate = useNavigate();
  const {
    userDropdownOptions,
    setUserDropdownOptions,
    clearCart,
    setIsLoading,
  } = useContext(Context);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await clearCart();
      if (response.ok) {
        setIsLoading(false);
        setUserDropdownOptions(false);
        localStorage.removeItem("token");
        window.location.reload();
      } else {
        setIsLoading(false);
        toast.error("Unable to log out", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Unable to log out", {
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      {userDropdownOptions ? (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="hidden md:flex shadow-xl bg-white rounded-lg absolute right-20 overflow-hidden mt-[60px] z-20"
          >
            <div className="flex flex-col">
              <button
                onClick={() => {
                  navigate("/my-orders", { replace: true });
                  setUserDropdownOptions(false);
                }}
                className="flex gap-2 p-2 w-full justify-center items-center cursor-pointer hover:bg-gray-200"
              >
                <AiOutlineHistory color="gray " />
                <p className="text-gray-500">My Orders</p>
              </button>
              <button
                onClick={() => {
                  navigate("/profile", { replace: true });
                  setUserDropdownOptions(false);
                }}
                className="flex gap-2 px-8 py-2 w-full justify-center items-center cursor-pointer hover:bg-gray-200"
              >
                <BsPersonCircle color="gray " />
                <p className="text-gray-500">Profile</p>
              </button>

              <button
                onClick={handleLogout}
                className="flex gap-2 p-2 w-full justify-center items-center cursor-pointer hover:bg-gray-200"
              >
                <AiOutlineLogout color="gray " />
                <p className="text-gray-500">Logout</p>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Dropdown;
