import React, { useEffect, useState } from 'react';
import backendApi from '../apis/axiosConfig';
import { Surcharge } from '../interfaces';
import { Restaurant } from '../interfaces';
import Header from './Header';
import '../styles/ViewSurcharges.css'

const ViewSurcharges: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<number | null>(null);
  const [surcharges, setSurcharges] = useState<Surcharge[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await backendApi.get('/restaurant');
        // Assuming response.data is nested, flatten it if necessary
        const restaurantData = Array.isArray(response.data) 
          ? response.data.flat().map((item) => item.Name ? item : item[0]) 
          : response.data;
          
        // Map the flattened data to an array of restaurant objects
        setRestaurants(restaurantData.map((restaurant: { res_id: number; Name: string; }) => ({
          res_id: restaurant.res_id,
          Name: restaurant.Name,
        })));
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };
    fetchRestaurants();
  }, []);

  const handleCardClick = async (res_id: number) => {
    setSelectedRestaurantId(res_id);
    try {
      const response = await backendApi.get(`/restaurants/${res_id}/surcharges`);
      setSurcharges(response.data);
    } catch (error) {
      console.error('Error fetching surcharges:', error);
    }
  };

  return (
    <div className='home-container'>
      <Header/>
      <div style={{marginTop: '50px'}}>
        <h2>Restaurants</h2>
        <div className="restaurant-cards">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.res_id}
              className="restaurant-card"
              onClick={() => handleCardClick(restaurant.res_id)}
            >
              {restaurant.Name}
            </div>
          ))}
        </div>

        {selectedRestaurantId && (
          <div className="surcharges-section">
            <h3>Surcharges for Restaurant ID {selectedRestaurantId}</h3>
            {surcharges.length > 0 ? (
              <ul>
                {surcharges.map((surcharge) => (
                  <li key={surcharge.surcharge_id}>
                    {surcharge.surcharge_name}: {surcharge.surcharge_percentage}%
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
