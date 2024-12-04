export const GOOGLE_API_KEY = "AIzaSyA7gbee1inBPOpvbkVSezjM0R-lnntjG1w";
export const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GOOGLE_API_KEY}`;
export const API_PROMPT =
  //"Use the attached image and return a JSON object containing restaurant name, date, subtotal, total, surcharges (structure format with surcharge name and surcharge value), and taxes:\n";
  `Please use the attached image of a receipt and return a JSON object of the following information: 
  restaurant_name: The name of the establishment.
  location: The complete address of the restaurant, written in plain English without using escape characters like \n or \t.
  date: Just the date and not the time on the receipt.
  subtotal: The total amount before taxes and surcharges. 
  total: The final amount due.
  surcharges: A list of any additional charges, exclude any taxes(including sales tax), with the following details:
    -surcharge_name: If the surcharge name is specified, use it directly. If not specified, derive a meaningful name from any descriptive text at the end of the bill, or default to unknown if no description is available.
    - surcharge_value: The monetary amount for the surcharge.
    - surcharge_percent: Use the percentage value from the line above the description (for example, '3.25%' as '3.25').
  taxes: Taxes charged by the restuarant as object`

export const VITE_CLERK_PUBLISHABLE_KEY =
    "pk_test_aG9wZWZ1bC1hbnQtNTYuY2xlcmsuYWNjb3VudHMuZGV2JA";

export const API_USER_DATA_COORDINATES_PROMPT = `Given this bill, provide me an array for each user detail with coordinates of sensitive user details containing specific x coordinate, y coordinate, width and height exclude date, amount and time. The result should be an array of objects where each object is of the format:-
x: x coordinate of the data
y: y coordinate of the data
width: width of the data
height: height of the data`

export const API_YELP_PROMOTIONS_KEY = `Y7BKhvltcCcOts52AX1ZTslZsX9iWPwX_TpOT62W2_JG7WdCGLAZb1OrJO6IKR4-CN_ZM5Dkk8dKwsw3K8IbwW2bEo9CBr7wt4-TDzWaX6Yg5Kwe87WSUEYAhjVNZ3Yx`

export const API_YELP_CLIENT_ID = `rbD-n8-ou2PEnUXc1qaQBQ`

export const API_YELP_ENDPOINT = `https://api.yelp.com/v3/businesses/search`