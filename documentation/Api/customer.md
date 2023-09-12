# API Customer Endpoint Documentation

This documentation outlines the functionality of the `customer.js` file, which serves as an API endpoint for retrieving customer information based on their email address.

## File Information

- **File Name:** `customer.js`
- **Location:** `pages/api/customer.js`

## Endpoint Description

The `customer.js` file defines an API endpoint that accepts a request with a customer's email address and retrieves the corresponding customer information from a database.

## Usage

To use this API endpoint, make a GET request to the following URL:

```/api/customer?email={customer_email}```


Replace `{customer_email}` with the actual email address of the customer you want to retrieve.

## Request

- **Method:** GET
- **Endpoint:** `/api/customer`
- **Query Parameters:**
  - `email` (string, required): The email address of the customer you want to retrieve.

## Response

- **Success Response (HTTP Status 200 OK):**
  - **Content Type:** JSON
  - **Body:** An object containing customer information.
    - `customer` (object): The customer object with details.
  
  Example:

  ```json
  {
    "customer": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      // Additional customer fields here...
    }
  }


## Code Explanation
The code in customer.js performs the following steps:

- Imports the customers database from ../../assets/database.js.

- Defines an API endpoint handler function that accepts a req (request) and res (response) object.

- Extracts the email query parameter from the request URL.

- Searches for a customer in the customers array whose email matches the provided email.

- If a matching customer is found, it sends a success response with the customer's details.

- If no customer is found, it sends a 404 error response with an error message indicating that the customer was not found.



This code makes a GET request to retrieve customer information based on the email address provided in the query parameter.

That's it! You can now use this API endpoint to retrieve customer information based on their email address.



