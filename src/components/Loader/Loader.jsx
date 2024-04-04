import { RotatingLines } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loaderWrap}>
      <RotatingLines
        visible={true}
        height="75"
        width="75"
        strokeColor="grey"
        strokeWidth="2"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
