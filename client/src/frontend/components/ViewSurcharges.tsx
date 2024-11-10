import React, { useEffect, useState } from 'react';
import backendApi from '../apis/axiosConfig';

interface Surcharge {
  restaurantName: string;
  surchargeName: string;
  surchargeAmount: number;
}

const ViewSurcharges: React.FC = () => {
  const [surcharges, setSurcharges] = useState<Surcharge[]>([]);

  useEffect(() => {
    const fetchSurcharges = async () => {
      try {
        const response = await backendApi.get('/surcharges');
        setSurcharges(response.data);
      } catch (error) {
        console.error("Error fetching surcharges:", error);
      }
    };

    fetchSurcharges();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Restaurant Surcharges</h2>
      {surcharges.length > 0 ? (
        <ul>
          {surcharges.map((surcharge, index) => (
            <li key={index} className="surcharge-item">
              <strong>{surcharge.restaurantName}</strong> - {surcharge.surchargeName}: ${surcharge.surchargeAmount.toFixed(2)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No surcharges available.</p>
      )}
    </div>
  );
};

export default ViewSurcharges;
