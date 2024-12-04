export const GOOGLE_API_KEY = "AIzaSyA7gbee1inBPOpvbkVSezjM0R-lnntjG1w";
export const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GOOGLE_API_KEY}`;
export const API_PROMPT = `You are a receipt analysis assistant. Generate the following structured output in JSON format based on the input provided.

Input:
Receipt Image: [Attached receipt image]

Required Fields:
1. **restaurant_name**: The name of the establishment as printed on the receipt.
2. **date**: The transaction date, excluding the time.
3. **subtotal**: The total amount before taxes and surcharges.
4. **total**: The final amount due after all calculations.
5. **surcharges**: A list of additional charges (excluding taxes) with each item structured as:
   - **surcharge_name**: Use the name specified on the receipt. If no name is specified, derive a meaningful name from nearby descriptive text or use "unknown" if unavailable.
   - **surcharge_value**: The monetary value of the surcharge.
   - **surcharge_percent**: Include the percentage (e.g., "3.25%") if listed, or leave this field empty if not available.
6. **taxes**: An object representing the taxes charged by the restaurant, structured as:
   - **tax_name**: The name of the tax (e.g., "Sales Tax").
   - **tax_value**: The monetary amount of the tax.

Output Format:
{
  "restaurant_name": "<restaurant_name>",
  "date": "<date>",
  "subtotal": <subtotal>,
  "total": <total>,
  "surcharges": [
    {
      "surcharge_name": "<surcharge_name>",
      "surcharge_value": <surcharge_value>,
      "surcharge_percent": "<surcharge_percent>"
    },
    ...
  ],
  "taxes": {
    "tax_name": "<tax_name>",
    "tax_value": <tax_value>
  }
}

Now generate the structured output based on the input above.
`;

export const VITE_CLERK_PUBLISHABLE_KEY =
  "pk_test_aG9wZWZ1bC1hbnQtNTYuY2xlcmsuYWNjb3VudHMuZGV2JA";

export const API_USER_DATA_COORDINATES_PROMPT = `Given this bill, provide me an array for each user detail with coordinates of sensitive user details containing specific x coordinate, y coordinate, width and height exclude date, amount and time. The result should be an array of objects where each object is of the format:-
x: x coordinate of the data
y: y coordinate of the data
width: width of the data
height: height of the data`;

export const API_YELP_PROMOTIONS_KEY = `Y7BKhvltcCcOts52AX1ZTslZsX9iWPwX_TpOT62W2_JG7WdCGLAZb1OrJO6IKR4-CN_ZM5Dkk8dKwsw3K8IbwW2bEo9CBr7wt4-TDzWaX6Yg5Kwe87WSUEYAhjVNZ3Yx`;

export const API_YELP_CLIENT_ID = `rbD-n8-ou2PEnUXc1qaQBQ`;

export const API_YELP_ENDPOINT = `https://api.yelp.com/v3/businesses/search`;
