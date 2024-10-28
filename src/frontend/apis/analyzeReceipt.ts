import axios from "axios";
import { API_ENDPOINT, API_PROMPT } from "./config";

export const analyze_receipt = async (image: string) => {
  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: API_PROMPT,
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
    const response = await axios.post(API_ENDPOINT, requestBody, {
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
