import "./App.css";
import Search from "./components/Search";
import { FaDrumstickBite } from "react-icons/fa";

function App() {
  return (
    <>
      <h1>
        Re
        <FaDrumstickBite className="icon" />
        eiptaraunt
      </h1>
      <div className="search-container">
        <Search />
      </div>
    </>
  );
}

export default App;
