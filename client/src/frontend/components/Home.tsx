import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import backendApi from "../apis/axiosConfig";
import Header from "./Header";
import Loader from "./Loader";
import "../styles/Home.css";
import "../styles/ViewSurcharges.css";
import { Surcharge } from "../interfaces";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selectedRestaurantName, setSelectedRestaurantName] =
    useState<string>("");
  const [surcharges, setSurcharges] = useState<Surcharge[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [surchargeStatus, setSurchargeStatus] = useState<{
    [key: number]: string;
  }>({});
  const [showModal, setShowModal] = useState(false);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await backendApi.get("/restaurant");
        const restaurantData = response.data;

        setRestaurants(
          restaurantData.map(
            (restaurant: { res_id: number; Name: string }) => ({
              res_id: restaurant.res_id,
              Name: restaurant.Name,
            })
          )
        );
        setFilteredRestaurants(restaurantData);
        setLoading(false);
        fetchSurchargeStatus(restaurantData);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    const fetchSurchargeStatus = async (restaurants: any[]) => {
      const status: { [key: number]: string } = {};

      for (const restaurant of restaurants) {
        try {
          const response = await backendApi.get(
            `/restaurant/${encodeURIComponent(restaurant.Name)}/bills`
          );
          const surchargeData = response.data[0];

          if (!surchargeData || surchargeData.length === 0) {
            status[restaurant.res_id] = "no-surcharge";
          } else {
            const totalSurchargePercent = surchargeData.reduce(
              (acc: number, surcharge: any) =>
                acc +
                (typeof surcharge.surcharge_percent === "number"
                  ? surcharge.surcharge_percent
                  : Number(surcharge.surcharge_percent) || 0),
              0
            );

            const avgSurchargePercent =
              surchargeData.length > 0
                ? totalSurchargePercent / surchargeData.length
                : 0;

            status[restaurant.res_id] =
              avgSurchargePercent < 3.5 ? "low-surcharge" : "high-surcharge";
          }
        } catch (error) {
          console.error(
            `Error fetching surcharges for ${restaurant.Name}:`,
            error
          );
          status[restaurant.res_id] = "no-surcharge";
        }
      }
      setSurchargeStatus(status);
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredRestaurants(
        restaurants.filter((restaurant: any) =>
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
      const response = await backendApi.get(
        `/restaurant/${encodeURIComponent(name)}/bills`
      );
      const surchargeData = response.data[0];
      setSurcharges(surchargeData);
      setShowModal(true); // Show modal on click
    } catch (error) {
      console.error("Error fetching bills and surcharges:", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRestaurantName("");
    setSurcharges([]);
  };

  const handleViewImage = async (imageKey: string) => {
    try {
      const response = await backendApi.get(`/s3Url/viewImage/${imageKey}`);
      setImageURL(response.data.imageUrl);
    } catch (error) {
      console.error("Error fetching image URL:", error);
    }
  };
  const handleCloseImage = () => {
    setImageURL(null);
  };

  return (
    <div className="home-container">
      <Header />
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft style={{ marginRight: "8px" }} />
        Back
      </button>
      <main className="main-content">
        <h2>Welcome to Receiptaurant</h2>
        <div className="description">
          Discover restaurants and manage surcharges easily with Receiptaurant.
        </div>
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
        {!loading ? (
          <div className="restaurant-cards">
            {filteredRestaurants.map((restaurant: any) => (
              <div
                key={restaurant.res_id}
                className={`restaurant-card ${
                  surchargeStatus[restaurant.res_id]
                }`}
                onClick={() => handleCardClick(restaurant.Name)}
              >
                {restaurant.Name}
              </div>
            ))}
          </div>
        ) : (
          <Loader text="Fetching restaurants..." />
        )}
      </main>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>
              &times;
            </button>
            <div className="surcharges-header">
              <h3>Surcharges for {selectedRestaurantName}</h3>
            </div>
            {surcharges.length > 0 ? (
              <ul className="surchargeList">
                {surcharges.map((surcharge, index) => (
                  <li key={surcharge.sur_id || index} className="surchargeItem">
                    <div className="surchargeName">
                      {surcharge.surcharge_name || "Unknown Surcharge"}
                    </div>
                    <div className="surchargeDetails">
                      <span className="surchargePercent">
                        {surcharge.surcharge_percent || "N/A"}%
                      </span>
                      <span className="surchargeValue">
                        Value: {surcharge.surcharge_amount || "N/A"}
                      </span>
                      <span className="surchargeDate">
                        Date:{" "}
                        {surcharge.Bill_Date
                          ? new Date(surcharge.Bill_Date).toLocaleDateString()
                          : "N/A"}
                      </span>
                      {surcharge.Image_key && (
                        <button
                          className="view-image-btn"
                          onClick={() => handleViewImage(surcharge.Image_key)}
                        >
                          View Image
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No surcharges available.</p>
            )}
          </div>
        </div>
      )}
      {imageURL && (
        <div className="image-modal">
          <div className="modal-content">
            <img src={imageURL} alt="Bill" />
            <button className="close-modal" onClick={handleCloseImage}>
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
