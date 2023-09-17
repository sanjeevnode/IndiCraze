import { BsArrowUpSquare } from "react-icons/bs";

const ScrollToTop = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="hidden md:flex fixed bottom-10 right-0">
      <div className="w-[60px] h-fit flex mr-[-30px] hover:mr-[-10px] duration-300 opacity-10 hover:opacity-100 ">
        <BsArrowUpSquare onClick={ handleScroll } className=" text-[rgb(255,102,0)] text-[20px] cursor-pointer" />
      </div>
    </div>
  );
};

export default ScrollToTop;
