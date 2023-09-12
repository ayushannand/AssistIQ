// File: pages/index.js

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call your own API to fetch and store customer data
      const response = await axios.get('/api/customers');
      const customers = response.data;

      // Format customer data as a prompt for OpenAI API
      const prompt = customers.map((customer) =>
        `Name: ${customer.name}, Email: ${customer.email}`
      ).join('\n');

      // Query the data using OpenAI API
      const openaiResponse = await axios.post('/api/query', { prompt, query });

      const generatedText = openaiResponse.data.result;
      setResult(generatedText);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Customer Data Query</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Result:</h2>
        <p>{result}</p>
      </div>
    </div>
  );
}
