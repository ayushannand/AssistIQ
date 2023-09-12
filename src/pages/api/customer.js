// File: pages/api/customer.js

import customers from '../../assets/database.js';

export default function handler(req, res) {
  const { email } = req.query;

  // Find the customer based on the email
  const customer = customers.find((c) => c.email === email);

  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  return res.status(200).json({ customer });
}
