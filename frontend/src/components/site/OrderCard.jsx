/* eslint-disable react/prop-types */
// import logo from "../../assets/cutlery.png";
import { motion } from "framer-motion";
import pinLogo from "../../assets/pin.png";
const OrderCard = ({ order }) => {
  const [date, time] = order.date.split(",");
  return (
    <div
      // style={{
      //   backgroundImage: `url(https://thumbs.dreamstime.com/b/old-lined-notebook-paper-background-yellowed-65966606.jpg)`,
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",
      // }}
      className=" relative w-full h-fit  p-1 gap-2 md:p-4 md:gap-2 flex flex-col justify-between cartitem-shadow rounded-sm"
    >
      <img
        className="absolute w-full h-full top-0 left-0 -z-0 opacity-60"
        src="https://thumbs.dreamstime.com/b/old-lined-notebook-paper-background-yellowed-65966606.jpg"
        alt=""
      />

      <motion.img
        initial={{ opacity: 0, y: -30 }}
        transition={{
          duration: 0.5,
          ease: "backIn",
        }}
        animate={{
          opacity: [1, 0],
          y: [0, -30],
          transition: {
            duration: 0.5,
          },
        }}
        whileInView={{ opacity: 1, y: 0 }}
        src={pinLogo}
        alt=""
        className="absolute top-0 left-0  pin-logo w-4 h-4 md:w-7 md:h-7"
      />

      <div className="w-full h-[50px] flex justify-between items-start z-10 py-2 md:py-1 px-4">
        <div className="flex flex-col ">
          <p className=" text-[10px] md:text-[12px] font-medium text-gray-500">
            Date :
          </p>
          <p className="text-[12px] md:text-[15px] font-medium text-[rgb(252,108,0)]">
            {date}
          </p>
        </div>
        {/* <div className="w-full h-full flex justify-center items-center">
          <motion.img
            animate={{ rotate: 360 }}
            transition={{
              ease: "linear",
              duration: 5,
              repeat: Infinity,
              delay: 1,
            }}
            src={logo}
            alt=""
            className="w-7 h-7 grayscale hover:grayscale-0 cursor-pointer"
          />
        </div> */}
        <div className="flex  flex-col">
          <p className="text-[10px] md:text-[12px] font-medium text-gray-500">
            Time :
          </p>
          <p className="text-[12px] md:text-[15px] font-medium text-[rgb(252,108,0)]">
            {time}
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        {order.items.map((item, index) => {
          return <CartItems key={index} item={item} />;
        })}
      </div>

      <div className="w-full flex justify-end items-center px-2 z-10">
        <div className="flex gap-2 px-7">
          <p className="text-[18px] md:text-xl italic  text-gray-500">
            Total :
          </p>
          <p className="text-[18px] md:text-xl italic text-[rgb(252,108,0)]">
            Rs. {order.totalPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

const CartItems = ({ item }) => {
  return (
    <div className="relative w-full grid grid-cols-3 p-2 gap-1 md:gap-4 bg-transparent rounded-md">
      <div className="w-full flex justify-center items-center">
        <img
          className=" w-16 h-16 md:w-20 md:h-20  rounded-full"
          src={item.image}
          alt=""
        />
      </div>
      <div className="w-full flex justify-center items-center">
        <p className="text-[11px] md:text-[18px] font-mono italic text-gray-600">
          {item.name}
        </p>
      </div>
      <div className="w-full flex justify-center items-center">
        <p className="text-[11px] md:text-[18px] italic font-mono text-gray-600">
          Rs. {item.price}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
