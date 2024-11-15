import { useState } from "react";
import { analyze_receipt } from "../apis/analyzeReceipt";
import { Receipt } from "../interfaces";
import backendApi from "../apis/axiosConfig";
import Header from "./Header";
import "../styles/UploadReceipt.css";
import Loader from "./Loader";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UploadReceipt = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [responseData, setResponseData] = useState<Receipt | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successfullUpload, setSuccessfullUpload] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] || null);
  };

  const parseDate = (date: string): string | null => {
    const patterns = [
      { regex: /^(\d{2})\/(\d{2})\/(\d{4})$/, format: "MM/DD/YYYY" },
      { regex: /^(\d{2})\/(\d{2})\/(\d{2})$/, format: "MM/DD/YY" },
      { regex: /^(\d{2})\/(\d{2})\/(\d{2})$/, format: "YY/MM/DD" },
      { regex: /^(\d{4})\/(\d{2})\/(\d{2})$/, format: "YYYY/MM/DD" },
      { regex: /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, format: "M/D/YYYY" },
      { regex: /^(\d{1,2})\/(\d{1,2})\/(\d{2})$/, format: "M/D/YY" },
      { regex: /^(\d{1,2})\/(\d{1,2})\/(\d{2})$/, format: "YY/M/D" },
      { regex: /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/, format: "YYYY/M/D" },
      { regex: /^(\d{2}) (\w{3}) (\d{4})$/, format: "DD MMM YYYY" },
      { regex: /^(\d{2})-(\w{3})-(\d{4})$/, format: "DD-MMM-YYYY" },
    ];

    const monthMap: { [key: string]: string } = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    for (const { regex, format } of patterns) {
      const match = date.match(regex);
      if (match) {
        const [, part1, part2, part3] = match;
        switch (format) {
          case "MM/DD/YYYY":
            return `${part3}-${part1.padStart(2, "0")}-${part2.padStart(
              2,
              "0"
            )}`;
          case "MM/DD/YY":
            {
              const yearMMDDYY = parseInt(part3, 10) < 50 ? `20${part3}` : `19${part3}`;
              return `${yearMMDDYY}-${part1.padStart(2, "0")}-${part2.padStart(2, "0")}`;
            }
          case "YY/MM/DD":
            {
              const yearYYMMDD = parseInt(part1, 10) < 50 ? `20${part1}` : `19${part1}`;
              return `${yearYYMMDD}-${part2.padStart(2, "0")}-${part3.padStart(2, "0")}`;
            }
          case "YYYY/MM/DD":
            return `${part1}-${part2.padStart(2, "0")}-${part3.padStart(
              2,
              "0"
            )}`;
          case "M/D/YYYY":
            return `${part3}-${part1.padStart(2, "0")}-${part2.padStart(
              2,
              "0"
            )}`;
          case "M/D/YY": {
            const yearMDYY = parseInt(part3, 10) < 50 ? `20${part3}` : `19${part3}`;
            return `${yearMDYY}-${part1.padStart(2, "0")}-${part2.padStart(2, "0")}`;
          }
          case "YY/M/D":
            {
              const yearYYMD = parseInt(part1, 10) < 50 ? `20${part1}` : `19${part1}`;
              return `${yearYYMD}-${part2.padStart(2, "0")}-${part3.padStart(2, "0")}`;
            }
          case "YYYY/M/D":
            return `${part1}-${part2.padStart(2, "0")}-${part3.padStart(
              2,
              "0"
            )}`;
          case "DD MMM YYYY":
          case "DD-MMM-YYYY":
            {
              const month = monthMap[part2];
              return `${part3}-${month}-${part1.padStart(2, "0")}`;
            }
          default:
            return null;
        }
      }
    }
    return null;
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    setLoading(true);

    reader.onloadend = async () => {
      const result = reader.result as string;
      const image = result.split(",")[1];

      try {
        const response: Receipt = await analyze_receipt(image);

        response.surcharges = response.surcharges.map((surcharge) => {
          if (
            !surcharge.surcharge_percent &&
            surcharge.surcharge_value &&
            response.subtotal
          ) {
            const subtotal = parseFloat(response.subtotal);
            const surchargeAmount = parseFloat(
              surcharge.surcharge_value.replace(/,/g, "")
            );
            surcharge.surcharge_percent =
              subtotal > 0
                ? ((surchargeAmount / subtotal) * 100).toFixed(2) + "%"
                : "0%";
          }
          return surcharge;
        });
        setResponseData(response);
        setError(null);
        await sendReceiptDataToBackend(response, selectedFile.name);
      } catch (error) {
        console.error("Error analyzing receipt:", error);
        setError("Error analyzing receipt. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(selectedFile);
  };

  const sendReceiptDataToBackend = async (data: Receipt, imageName: string) => {
    if (!data || !data.date || !data.restaurant_name) {
      setError("Incomplete receipt data received.");
      return;
    }

    const formattedDate = parseDate(data.date);
    if (!formattedDate) {
      setError("Invalid date format.");
      return;
    }

    //console.log("Parsed Date:", formattedDate);

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
          let surchargePercent = surcharge["surcharge_percent"]
            ? parseFloat(surcharge["surcharge_percent"].replace("%", ""))
            : 0;
          const surchargeAmount = surcharge["surcharge_value"]
            ? parseFloat(surcharge["surcharge_value"].replace(/,/g, ""))
            : 0;

          if (surchargePercent == 0 && surchargeAmount > 0 && data.subtotal) {
            const subtotal = parseFloat(data.subtotal);
            surchargePercent =
              subtotal > 0 ? (surchargeAmount / subtotal) * 100 : 0;
          }

          await backendApi.post("/surcharge", {
            res_id: restaurantId,
            bill_id: billId,
            surcharge_name: surchargeName,
            surcharge_percent: surchargePercent,
            surcharge_amount: surchargeAmount,
          });
        }
      }
      setSuccessfullUpload(true)
      //console.log("Data saved to the backend successfully.");
    } catch (error) {
      console.error("Error sending data to the backend:", error);
      setError("Failed to save receipt data to the backend.");
    }
  };

  return (
    <div className="home-container">
      <Header />
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft style={{ marginRight: "8px" }} />
        Back
      </button>
      <div className="page-container">
        <h2 className="page-heading">Upload Receipt</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUpload} className="upload-btn">
          Upload
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successfullUpload && <p style={{ color: "green", marginTop: '10px' }}>Receipt uploaded successfully!</p>}
        {loading && <Loader text="Analyzing your receipt..." />}
        {!loading && responseData && (
          <div className="response-data">
            <div className="response-item">
              Restaurant: {responseData.restaurant_name}
            </div>
            <div className="response-item">
              Subtotal: {responseData.subtotal}
            </div>
            <div className="response-item">Total: {responseData.total}</div>
            <div className="response-item">Date: {responseData.date}</div>
            <div className="response-item">
              Taxes:
              {Array.isArray(responseData.taxes) && responseData.taxes.length > 0 ? (
                responseData.taxes.map((tax: { tax_name: string; tax_value: string; tax_percent: string }, index: number) => (
                  <div key={index}>
                    <span>
                      {tax.tax_name}: {tax.tax_value} ({tax.tax_percent})
                    </span>
                  </div>
                ))
              ) : (
                <span>No taxes available.</span>
              )}
            </div>
            <div className="surcharges-section">
              <h4 className="surcharges-title">Surcharges</h4>
              {responseData.surcharges && responseData.surcharges.length > 0 ? (
                responseData.surcharges.map((s, index) => (
                  <div key={index} className="surcharge-item">
                    <span className="surcharge-name">
                      {s["surcharge_name"]} |{" "}
                    </span>
                    <span className="surcharge-value">
                      Value: {s["surcharge_value"]} |{" "}
                    </span>
                    <span className="surcharge-percent">
                      Percentage: {s["surcharge_percent"]}
                    </span>
                  </div>
                ))
              ) : (
                <h4>No surcharges available.</h4>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadReceipt;
