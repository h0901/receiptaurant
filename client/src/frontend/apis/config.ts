export const GOOGLE_API_KEY = "AIzaSyA7gbee1inBPOpvbkVSezjM0R-lnntjG1w";
export const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GOOGLE_API_KEY}`
export const API_PROMPT =
  "Use the attached image and return a JSON object containing restaurant name, date, subtotal, total, surcharges array with list of different surcharges in the given format surcharge name, percentage of each surcharge named as surcharge percentage and surcharge value , and taxes:\n";
