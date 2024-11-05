import { useState } from "react";
import { analyze_receipt } from "../apis/analyzeReceipt";
import { Receipt } from "../interfaces";
import backendApi from "../apis/axiosConfig";

const UploadReceipt = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [responseData, setResponseData] = useState<Receipt | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      const result = reader.result as string;
      const image = result.split(",")[1];

      try {
        const response: Receipt = await analyze_receipt(image);
        setResponseData(response);
        setError(null);
        console.log(response)
        await sendReceiptDataToBackend(response, selectedFile.name);
      } catch (error) {
        console.error("Error analyzing receipt:", error);
        setError("Error analyzing receipt. Please try again.");
      }
    };

    reader.readAsDataURL(selectedFile);
  };

  const sendReceiptDataToBackend = async (data: Receipt, imageName: string) => {
    if (!data || !data.date || !data.restaurant_name) {
      setError("Incomplete receipt data received.");
      return;
    }

    const [month, day, year] = data.date.split("/");
    const formattedDate = `20${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    try {
      const restaurantResponse = await backendApi.post("/restaurant", {
        name: data.restaurant_name,
        location: data.location || "Unknown",
      });
      const restaurantId = restaurantResponse.data.restaurantId;

      const billResponse = await backendApi.post("/bill", {
        restaurant_id: restaurantId,
        bill_image: imageName,
        bill_date: formattedDate,
      });
      const billId = billResponse.data.billId;

      if (data.surcharges && Array.isArray(data.surcharges)) {
        for (const surcharge of data.surcharges) {
          const surchargeName = surcharge["surcharge_name"];
          const surchargePercent = surcharge["surcharge_percentage"] ? parseFloat(surcharge["surcharge_percentage"].replace('%', '')) : 0;
          const surchargeAmount = surcharge["surcharge_value"]? parseFloat(surcharge["surcharge_value"].replace(/,/g, '')): 0;

          await backendApi.post("/surcharge", {
            res_id: restaurantId,
            bill_id: billId,
            surcharge_name: surchargeName,
            surcharge_percent: surchargePercent,
            surcharge_amount: surchargeAmount,
          });
        }
      }

      console.log("Data saved to the backend successfully.");
    } catch (error) {
      console.error("Error sending data to the backend:", error);
      setError("Failed to save receipt data to the backend.");
    }
  };

  return (
    <div>
      <h2>Upload Receipt</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {responseData && (
        <div>
          <h3>Response Data:</h3>
          <div>Restaurant: {responseData.restaurant_name}</div>
          <div>Subtotal: {responseData.subtotal}</div>
          <div>Total: {responseData.total}</div>
          <div>Date: {responseData.date}</div>
          <div>Surcharges:</div>
          {responseData.surcharges && responseData.surcharges.length > 0 && responseData.surcharges.map((s, index) => (
            <div key={index}>
              <p>{s["surcharge_name"]}: {s["surcharge_value"]}</p>
            </div>
          ))}
          <div>Taxes: {responseData.taxes}</div>
        </div>
      )}
    </div>
  );
};

export default UploadReceipt;
