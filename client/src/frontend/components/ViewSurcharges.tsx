import React, { useEffect, useState } from "react";
import backendApi from "../apis/axiosConfig";
import { Surcharge } from "../interfaces";
import { Restaurant } from "../interfaces";
import Header from "./Header";
import "../styles/ViewSurcharges.css";
import Loader from "./Loader";

const ViewSurcharges: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );
  //const [selectedRestaurantId, setSelectedRestaurantId] = useState<number | null>(null);
  const [selectedRestaurantName, setSelectedRestaurantName] =
    useState<string>("");
  const [surcharges, setSurcharges] = useState<Surcharge[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await backendApi.get("/restaurant");
        const restaurantData = response.data;
        console.log(restaurantData);

        setRestaurants(
          restaurantData.map(
            (restaurant: { res_id: number; Name: string }) => ({
              res_id: restaurant.res_id,
              Name: restaurant.Name,
            })
          )
        );
        setFilteredRestaurants(restaurantData);
        console.log("Fetched Restaurants:", restaurantData);
        setLoading(false);
        console.log(loading);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredRestaurants(
        restaurants.filter((restaurant) =>
          restaurant.Name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredRestaurants(restaurants);
    }
  }, [searchQuery, restaurants]);

  const handleCardClick = async (name: string) => {
    setSelectedRestaurantName(name); 
    try {
      const encodedName = encodeURIComponent(name);
      const response = await backendApi.get(`/restaurant/${encodedName}/bills`);
      const surchargeData = response.data[0];
      setSurcharges(surchargeData);
      console.log("Fetched Surcharges:", response.data);
    } catch (error) {
      console.error("Error fetching bills and surcharges:", error);
    }
  };
  

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCloseSurcharges = () => {
    //setSelectedRestaurantId(null);
    setSelectedRestaurantName("");
    setSurcharges([]);
  };

 

  return (
    <div className="home-container">
      <Header />
      <div style={{ marginTop: "50px" }}>
        <div className="restaurants-header">
          <h2>Restaurants</h2>
        </div>
        {!loading ? (
          <div>
            <div className="search-bar-container">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search restaurants by name..."
                className="search-bar"
              />
            </div>

            <div className="restaurant-cards">
              {filteredRestaurants.map((restaurant) => (
                <div
                  key={restaurant.res_id}
                  className="restaurant-card"
                  onClick={() =>
                    handleCardClick(restaurant.Name)
                  }
                >
                  {restaurant.Name}
                </div>
              ))}
            </div>

            {selectedRestaurantName && surcharges.length > 0 && (
              <div className="surcharges-section">
                <div className="surcharges-header">
                  <h3>Surcharges for {selectedRestaurantName}</h3>
                  <button
                    style={{ backgroundColor: "#6f4f37" }}
                    onClick={handleCloseSurcharges}
                  >
                    x
                  </button>
                </div>
                {surcharges.length > 0 ? (
                  <ul className="surchargeList">
                  {surcharges.map((surcharge, index) => (
                    <li key={surcharge.sur_id || index} className="surchargeItem">
                      <div className="surchargeName">{surcharge.surcharge_name || "Unknown Surcharge"}</div>
                      <div className="surchargeDetails">
                        <span className="surchargePercent">{surcharge.surcharge_percent || "N/A"}%</span>
                        <span className="surchargeValue">Value: {surcharge.surcharge_amount || "N/A"}</span>
                        <span className="surchargeDate">Date: {surcharge.Bill_Date ? new Date(surcharge.Bill_Date).toLocaleDateString() : "N/A"}</span>
                      </div>
                    </li>
                  ))}
                </ul>                              
                ) : (
                  <p>No surcharges available.</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <Loader text="Fetching restaurants..." />
        )}
      </div>
    </div>
  );
};

export default ViewSurcharges;
