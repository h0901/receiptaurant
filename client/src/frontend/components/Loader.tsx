import { LoaderText } from "../interfaces";
import "../styles/Loader.css";

const Loader = (props: LoaderText) => {
  return (
    <div className="loader-container">
      <div className="loader-receipt">
        <div className="loader-scanner"></div>
      </div>
      <p className="loader-text">{props.text}</p>
    </div>
  );
};

export default Loader;
