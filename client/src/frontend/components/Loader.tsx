import '../styles/Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-receipt">
        <div className="loader-scanner"></div>
      </div>
      <p className="loader-text">Analyzing YourReceipt...</p>
    </div>
  );
};

export default Loader;
