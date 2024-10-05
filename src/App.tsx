import "./App.css";
import RestaurantCard from "./components/RestaurantCard";
import Search from "./components/Search";
import { FaDrumstickBite } from "react-icons/fa";
import { RestaurantDetails } from "./interface"; 

const restaurants: RestaurantDetails[] = [
  { id: '1', name: "Dunkin" },
  { id: '2', name: "McD" }
];

const resList: string[] = ["Dunkin", "McD"];

function App() {
  return (
    <>
      <h1>
        Re
        <FaDrumstickBite className="icon" />
        eiptaurant
      </h1>
      <div className="search-container">
        <Search restaurants={resList} />
        <RestaurantCard restaurants={restaurants} />
      </div>
    </>
  );
}

export default App;
