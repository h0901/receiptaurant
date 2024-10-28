import { useState } from "react";
import { analyze_receipt } from "../apis/analyzeReceipt";
import { Receipt } from "../interfaces";

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
        console.log(response);
        setError(null);
      } catch (error) {
        console.error("Error analyzing receipt:", error);
        setError("Error analyzing receipt. Please try again.");
      }
    };

    reader.readAsDataURL(selectedFile);
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
          <div>Restaurant: {responseData["restaurant_name"]}</div>
          <div>Subtotal: {responseData["subtotal"]}</div>
          <div>Total: {responseData["total"]}</div>
          <div>Date: {responseData["date"]}</div>
          <div>Surcharges:-</div>
          {responseData["surcharges"].map((surcharge, index) => (
            <div key={index}>
              <div>
                {" "}
                {surcharge.surcharge_name}: {surcharge.value}
              </div>
            </div>
          ))}
          <div>Taxes: {responseData["taxes"]} </div>
        </div>
      )}
    </div>
  );
};

export default UploadReceipt;
