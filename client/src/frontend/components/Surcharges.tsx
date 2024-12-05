import React from "react";
import "../styles/Home.css";
import "../styles/ViewSurcharges.css";
import { SurchargesProps } from "../interfaces";

const Surcharges: React.FC<SurchargesProps> = ({
  surcharges,
  selectedRestaurantName,
  closeModal,
  handleViewImage,
}) => {
  return (
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
  );
};

export default Surcharges;
