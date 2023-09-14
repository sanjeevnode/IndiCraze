import Backdrop from "./Backdrop";
import ReactLoading from "react-loading";

const LoadingBackdrop = () => {
  return (
    <Backdrop>
      <div className="">
        <ReactLoading type="spokes" color="#ff6600" height={150} width={150} />
      </div>
    </Backdrop>
  );
};

export default LoadingBackdrop;
