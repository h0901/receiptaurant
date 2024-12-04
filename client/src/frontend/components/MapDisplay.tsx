import React, { useState, useEffect } from "react";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
import "../styles/MapDisplay.css";

export interface Restaurant {
    res_id: number;
    Name: string;
    location: string;
    lat?: number;
    lng?: number;
  }

const MapDisplay: React.FC<{ restaurants: Restaurant[] }> = ({ restaurants }) => {
    const [geocodedRestaurants, setGeocodedRestaurants] = useState<Restaurant[]>([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
    const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        const geocodeAddresses = async () => {
          const geocoded = await Promise.all(
            restaurants.map(async (restaurant) => {
              if (restaurant.lat && restaurant.lng) return restaurant; 
    
              try {
                //console.log(`Geocoding address: ${restaurant.location}`);
                const response = await fetch(
                  `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                    restaurant.location
                  )}&key=AIzaSyBaS0jphBt4LprEgnnoH5XU10iyhTPqrU0`
                );
                const data = await response.json();
                //console.log(`Geocoding response for ${restaurant.Name}:`, data);
              
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
    
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 1 }}>
      <APIProvider apiKey="AIzaSyBaS0jphBt4LprEgnnoH5XU10iyhTPqrU0">
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
                  onClick={() => setSelectedRestaurant(restaurant)}
                >
                  <Pin background="grey" borderColor="green" glyphColor="purple" />
                </AdvancedMarker>
              ))}
            {selectedRestaurant && (
              <InfoWindow
                position={{ lat: selectedRestaurant.lat!, lng: selectedRestaurant.lng! }}
                onCloseClick={() => setSelectedRestaurant(null)}
              >
                <div>
                  <h3>{selectedRestaurant.Name}</h3>
                  <p>{selectedRestaurant.location}</p>
                </div>
              </InfoWindow>
            )}
          </Map>
        ) : (
          <p>Loading map...</p>
        )}
      </APIProvider>
    </div>
  );
};

export default MapDisplay;