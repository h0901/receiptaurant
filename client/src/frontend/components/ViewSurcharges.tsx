import React, { useEffect, useState } from "react";
import backendApi from "../apis/axiosConfig";
import { Surcharge } from "../interfaces";
import { Restaurant } from "../interfaces";
import Header from "./Header";
import "../styles/ViewSurcharges.css";

const ViewSurcharges: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    number | null
  >(null);
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

  const handleCardClick = async (res_id: number, name: string) => {
    setSelectedRestaurantName(name);
    console.log("Selected Restaurant ID:", res_id);
    setSelectedRestaurantId(res_id);
    try {
      const response = await backendApi.get(`/restaurant/${res_id}/surcharges`);
      setSurcharges(response.data[0]);
    } catch (error) {
      console.error("Error fetching surcharges:", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCloseSurcharges = () => {
    setSelectedRestaurantId(null);
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
                handleCardClick(restaurant.res_id, restaurant.Name)
              }
            >
              {restaurant.Name}
            </div>
          ))}
        </div>

        {selectedRestaurantId && (
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
              <ul>
                {surcharges.map((surcharge) => (
                  <li key={surcharge.sur_id}>
                    {surcharge.surcharge_name}: {surcharge.surcharge_percent}%
                    on {new Date(surcharge.bill_date).toLocaleString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No surcharges available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSurcharges;
