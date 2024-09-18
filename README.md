# cs484-final-project

# Receiptaurant 

A web application that calculates any extra charges that are imposed by restaurants from a bills dataset. Additionally, the application uses the bills to determine the timeframe at which maximum discounts are provided by the restaurants. Finally, the application uses API's of different Food Delivery platforms to enlist the respective prices and promotions for each restaurant. The core objective of the application is to provide the user with a brief overview of the restaurant's pricing range.

## Project Overview

Receiptaurant serves the following objectives:<br />
**Calculate Extra Charges:** Automatically detects and calculates any hidden or additional charges imposed by restaurants based on an uploaded dataset of bills.<br/>
**Discount Detection:** Analyzes the bills to determine the best time of year to receive discounts and promotions from different restaurants.<br/>
**Price Comparison:** Uses APIs from popular food delivery platforms to show restaurant prices, promotions, and help users choose the delivery service with the best deals.<br/>

By using OCR (Optical Character Recognition) to extract bill data and implementing a large language model (LLM) to analyze extra charges, Receiptaurant provides users with a comprehensive overview of a restaurant’s pricing patterns.<br/>

## Key Features

**OCR Bill Data Extraction:** Extracts relevant information from bill images using OCR.<br/>
**Extra Charge Calculation:** Leverages an LLM to identify and calculate additional fees on restaurant bills.<br/>
**Discount Trend Analysis:** Utilizes historical bill data to determine the timeframe with the highest number of discounts and promotions.<br/>
**API Integration with Food Delivery Platforms:** Fetches real-time restaurant prices, deals, and promotions from food delivery apps (e.g., UberEats, DoorDash, GrubHub).<br/>
**User-Friendly Overview:** Displays pricing ranges, promotions, and additional charges for each restaurant in a clean and intuitive interface.<br/>

## Security Considerations

**Integrity:** The main issue occurs if the bills provided for the dataset have been tampered with beforehand. Additionally, the results from the third-party APIs could be modified.<br/>
**Availability:** Since the application is using third-party APIs, there is a chance of the application being subjected to denial of service attacks.<br/>
