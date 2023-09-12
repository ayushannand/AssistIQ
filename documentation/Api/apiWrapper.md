## `getCombinedData` Function Documentation

The `getCombinedData` function is an asynchronous function that retrieves combined data related to a customer based on the provided email. It makes two API calls using the Axios library to fetch customer profile data and customer subscription details. The function then combines the responses from both API calls and returns the combined result.

### Function Parameters

- `email`: The email address of the customer for whom the combined data is to be retrieved.

### Function Implementation

The `getCombinedData` function performs the following steps:

1. Make the first API call to get customer profile data:
   - The function uses Axios to make a GET request to the `./api/getAllCustProfile` endpoint with the provided email as a query parameter.
   - The email is properly encoded using `encodeURIComponent` to ensure the URL's validity.
   - The response from the first API call contains customer profile data, including a `userId`.

2. Make the second API call to get customer subscription details:
   - The function uses Axios to make a GET request to the `./api/getSubscriptions` endpoint, passing the `userId` obtained from the first API response as a query parameter.
   - The `userId` is properly encoded using `encodeURIComponent` to ensure the URL's validity.
   - The response from the second API call contains customer subscription details.

3. Combine the responses from both API calls:
   - The function creates a new object `combinedResult`, which contains two properties: `CustomerIdentityDetails` and `CustomerSubscriptionDetails`.
   - The `CustomerIdentityDetails` property holds the customer profile data obtained from the first API call.
   - The `CustomerSubscriptionDetails` property holds the customer subscription details obtained from the second API call.

4. Return the combined response:
   - The function returns the `combinedResult`, which contains the customer's identity details and subscription details.

### Error Handling

- If any error occurs during the API calls (e.g., network error or incorrect API responses), the function catches the error and logs it to the console using `console.error`.
- In case of an error, the function throws a new `Error` with the message "Failed to fetch data from the API." This allows the calling code to handle the error appropriately.

### Note

- The function's behavior depends on the specific implementation and response format of the API endpoints (`./api/getAllCustProfile` and `./api/getSubscriptions`). Ensure that these API endpoints exist and provide the expected data format.
- The function assumes that the API responses contain the necessary data to create the `combinedResult` object. If the responses do not match the expected format, the function may not work as intended.
- Before using the `getCombinedData` function, make sure that the Axios library is properly installed and accessible in your application.