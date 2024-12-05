import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import backendApi from "../apis/axiosConfig";
import Header from "./Header";
import Loader from "./Loader";
import "../styles/Home.css";
import "../styles/ViewSurcharges.css";
import { Restaurant, Surcharge } from "../interfaces";
import MapDisplay from "./MapDisplay";
import Surcharges from "./Surcharges";

const Home: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );
  const [selectedRestaurantName, setSelectedRestaurantName] =
    useState<string>("");
  const [surcharges, setSurcharges] = useState<Surcharge[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [surchargeStatus, setSurchargeStatus] = useState<{
    [key: number]: string;
  }>({});
  const [showModal, setShowModal] = useState(false);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await backendApi.get("/restaurant");
        const restaurantData = response.data;

        setRestaurants(
          restaurantData.map(
            (restaurant: {
              res_id: number;
              Name: string;
              location: string;
            }) => ({
              res_id: restaurant.res_id,
              Name: restaurant.Name,
              location: restaurant.location,
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

    const fetchSurchargeStatus = async (restaurants: Restaurant[]) => {
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
      const response = await backendApi.get(
        `/restaurant/${encodeURIComponent(name)}/bills`
      );
      const surchargeData = response.data[0];
      setSurcharges(surchargeData);
      setShowModal(true);
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

  // const handleToggleChange = () => {
  //   setIsMapView((prev) => !prev);
  // };

  const handleShowMap = () => {
    setShowMap(true);
  };

  // const handleShowList = () => {
  //   setShowMap(false);
  // };

  return (
    <div className="home-container">
      <Header />
      {/* <button className="back-button" onClick={() => setShowMap(false)}>
        <FaArrowLeft style={{ marginRight: "8px" }} />
        Back
      </button> */}
      <main className="main-content">
        <h2>Welcome to Receiptaurant</h2>
        <div className="description">
          Discover restaurants and manage surcharges easily with Receiptaurant.
        </div>

        {!showMap ? (
          <div>
            <div className="restaurants-header">
              <h2>Restaurants</h2>
              <button className="map-view-button" onClick={handleShowMap}>
                View on Map
              </button>
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
          </div>
        ) : (
          <div>
            <button className="back-button" onClick={() => setShowMap(false)}>
              <FaArrowLeft style={{ marginRight: "8px" }} />
              Back
            </button>
            <MapDisplay restaurants={restaurants} />
          </div>
        )}
      </main>

      {showModal && (
        <Surcharges
          surcharges={surcharges}
          selectedRestaurantName={selectedRestaurantName}
          closeModal={closeModal}
          handleViewImage={handleViewImage}
        />
      )}

      {imageURL && (
        <div className="image-modal">
          <div className="modal-content-surcharge">
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
