# cs484-final-project

# Receiptaurant 

A web application that calculates any extra charges that are imposed by restaurants from a bills dataset. Additionally, the application uses API's of different Food Delivery platforms to enlist the respective prices and promotions for each restaurant. The core objective of the application is to provide the user with a brief overview of the restaurant's pricing range.

## Key Features

* **Bill Data Extraction:** Extracts relevant information from bill images and obtains all it's information in the form of a json object.<br/>
* **Extra Charge Calculation:** Leverages an LLM to identify from Google AI Studio and calculate additional fees on restaurant bills.<br/>
* **Displays restaurants:** Displays restaurant details based on the bill calculations in different formats and filters for the user to see<br/>
* **API Integration with Food Delivery Platforms:** Fetches real-time restaurant prices, deals, and promotions from food delivery apps (e.g., UberEats, DoorDash, GrubHub).<br/>
* **User-Friendly Overview:** Displays pricing ranges, promotions, and additional charges for each restaurant in a clean and intuitive interface.<br/>

## Security Considerations

* **Integrity:** The main issue occurs if the bills provided for the dataset have been tampered with beforehand. Additionally, the results from the third-party APIs could be modified.<br/>
* **Confidentiality:** Hides the user information in the bills<br/>
* **Availability:** Since the application is using third-party APIs, there is a chance of the application being subjected to denial of service attacks.<br/>
