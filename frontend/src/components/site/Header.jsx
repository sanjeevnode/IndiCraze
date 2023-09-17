/* eslint-disable react/prop-types */
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Header = ({ text }) => {
  const navigate = useNavigate();

  return (
    <>
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
        <p className="text-[15px] md:text-2xl text-gray-500 font-light">
          {text}
        </p>
      </div>
    </>
  );
};

export default Header;
