import axios from "axios";

export const analyze_receipt_api = async (
  image: string,
  endpoint: string,
  prompt: string
) => {
  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
          {
            inline_data: {
              mime_type: "image/jpeg",
              data: image,
            },
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(endpoint, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseText = response.data.candidates[0].content.parts[0].text;

    const cleanedText = responseText
      .replace(/`/g, "")
      .replace(/json/g, "")
      .trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error in analyze_receipt:", error);
    throw new Error("Failed to analyze the receipt.");
  }
};
