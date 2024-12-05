import React, { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import "../styles/MapDisplay.css";
import { Restaurant, Surcharge } from "../interfaces";
import backendApi from "../apis/axiosConfig";
import { FaEye } from "react-icons/fa";
import "../styles/MapDisplay.css";
import { API_GOOGLE_MAPS_KEY } from "../apis/config";
import Surcharges from "./Surcharges";

const MapDisplay: React.FC<{ restaurants: Restaurant[] }> = ({
  restaurants,
}) => {
  const [geocodedRestaurants, setGeocodedRestaurants] = useState<Restaurant[]>(
    []
  );
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [surcharges, setSurcharges] = useState<Surcharge[]>([]);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [viewSurcharge, setViewSurcharge] = useState(false);

  useEffect(() => {
    const geocodeAddresses = async () => {
      const geocoded = await Promise.all(
        restaurants.map(async (restaurant) => {
          if (restaurant.lat && restaurant.lng) return restaurant;

          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                restaurant.location
              )}&key=AIzaSyBaS0jphBt4LprEgnnoH5XU10iyhTPqrU0`
            );
            const data = await response.json();

            if (data.results.length > 0) {
              const location = data.results[0].geometry.location;
              return { ...restaurant, lat: location.lat, lng: location.lng };
            } else {
              console.warn(`No location found for ${restaurant.Name}`);
              return restaurant;
            }
          } catch (error) {
            console.error(`Error geocoding ${restaurant.Name}:`, error);
            return restaurant;
          }
        })
      );
      setGeocodedRestaurants(geocoded);
    };

    geocodeAddresses();
  }, [restaurants]);

  useEffect(() => {
    if (geocodedRestaurants.length > 0 && !mapCenter) {
      setMapCenter({
        lat: geocodedRestaurants[0].lat!,
        lng: geocodedRestaurants[0].lng!,
      });
    }
  }, [geocodedRestaurants, mapCenter]);

  const handleMarkerClick = async (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);

    try {
      const response = await backendApi.get(
        `/restaurant/${encodeURIComponent(restaurant.Name)}/bills`
      );
      const surchargeData = response.data[0];
      setSurcharges(surchargeData || []);
    } catch (error) {
      console.error("Error fetching bills and surcharges:", error);
      setSurcharges([]);
    }
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

  const closeModal = () => {
    setViewSurcharge(false);
    setSelectedRestaurant(null);
    setSurcharges([]);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
      }}
    >
      <APIProvider apiKey={API_GOOGLE_MAPS_KEY}>
        {geocodedRestaurants.length > 0 ? (
          <Map
            defaultZoom={7}
            minZoom={3}
            zoomControl={true}
            defaultCenter={{
              lat: geocodedRestaurants[0].lat!,
              lng: geocodedRestaurants[0].lng!,
            }}
            mapId="fa2cd7e520ce242f"
            style={{ width: "100%", height: "100%" }}
            gestureHandling="greedy"
          >
            {geocodedRestaurants
              .filter((restaurant) => restaurant.lat && restaurant.lng)
              .map((restaurant) => (
                <AdvancedMarker
                  key={restaurant.res_id}
                  position={{ lat: restaurant.lat!, lng: restaurant.lng! }}
                  onClick={() => handleMarkerClick(restaurant)}
                >
                  <Pin
                    background="grey"
                    borderColor="green"
                    glyphColor="brown"
                  />
                </AdvancedMarker>
              ))}
            {selectedRestaurant && (
              <InfoWindow
                position={{
                  lat: selectedRestaurant.lat!,
                  lng: selectedRestaurant.lng!,
                }}
                onCloseClick={() => {
                  setSelectedRestaurant(null);
                  setSurcharges([]);
                }}
                minWidth={300}
              >
                <div className="restaurant-info-container">
                  <h3 className="restaurant-name">{selectedRestaurant.Name}</h3>
                  {surcharges.length > 0 ? (
                    <ul className="surcharge-list">
                      {surcharges.map((surcharge, index) => (
                        <li
                          key={surcharge.sur_id || index}
                          className="surcharge-item-list"
                        >
                          <div className="surcharge-title">
                            {surcharge.surcharge_name || "Unknown Surcharge"}
                          </div>
                          <div className="surcharge-details">
                            <span className="surcharge-percentage">
                              Percentage: {surcharge.surcharge_percent || "N/A"}
                              %
                            </span>
                            <br />
                            <div className="image-display">
                              {surcharge.Image_key && (
                                <button
                                  className="image-button"
                                  onClick={() => setViewSurcharge(true)}
                                >
                                  <FaEye className="image-icon" size="lg" />
                                </button>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p
                      className="no-surcharge-text"
                      style={{
                        marginBottom: "15px",
                        //fontSize: "14px",
                        color: "black",
                      }}
                    >
                      No surcharges available.
                    </p>
                  )}
                </div>
              </InfoWindow>
            )}
          </Map>
        ) : (
          <p>Loading map...</p>
        )}
      </APIProvider>

      {viewSurcharge && (
        <Surcharges
          surcharges={surcharges}
          selectedRestaurantName={selectedRestaurant!.Name}
          closeModal={closeModal}
          handleViewImage={handleViewImage}
        />
      )}

      {imageURL && (
        <div className="image-modal">
          <div className="modal-content">
            <img src={imageURL} alt="Bill" />
            <button className="modal-close-button" onClick={handleCloseImage}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapDisplay;
