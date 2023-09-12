import axios from 'axios';

export default async function handler(req, res) {
  const apiEndpoint = 'http://127.0.0.1:5000/answer';
  const { customer, question } = req.body;

  try {
    const response = await axios.post(apiEndpoint, {
      question: question,
      customer:  JSON.stringify(customer)
    });

    if (response.status === 200) {
      const responseData = response.data.answer; // Extract the data property from the response object
      console.log(responseData);
      return res.status(200).json({ response: responseData });
    } else {
      return res.status(400).json({ error: 'An error occured' });
    }
  } catch (error) {
    console.error('Vicuna API error:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
