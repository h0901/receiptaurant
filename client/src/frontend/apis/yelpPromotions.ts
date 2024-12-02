import axios from "axios";
import { API_YELP_ENDPOINT, API_YELP_PROMOTIONS_KEY } from "./config";

export const get_yelp_data = async (restaurantName: string) => {
  try {
    const response = await axios.get(API_YELP_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${API_YELP_PROMOTIONS_KEY}`,
      },
      params: {
        term: restaurantName,
        location: "Chicago",
      },
    });

    const businesses = response.data.businesses;

    if (businesses.length > 0) {
      const restaurant = businesses[0];
      return restaurant.specials;
    }
  } catch (error) {
    console.error("Error fetching Yelp data:", error);
    throw new Error("Failed to fetch restaurant details from Yelp");
  }
};
