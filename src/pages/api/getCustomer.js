import customers from "../../assets/database.js"; // Import your database file here

export default async function getCombinedData(email) {
  try {
    // Step 1: Find the customer with the given email in the database
    const customer = customers.find((customer) => customer.email === email);

    if (!customer) {
      throw new Error("Customer not found");
    }

    // Return the entire customer object
    return customer;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data from the database.");
  }
}
