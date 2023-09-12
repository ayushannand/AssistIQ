// File: pages/api/query.js
// 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

import { Configuration, OpenAIApi } from "openai";
import customers from "../../assets/database.js";

// Set up OpenAI API credentials
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { email } = req.query;
  const { conversation } = req.body;

  // Find the customer based on the email
  const customer = customers.find((c) => c.email === email);



  const msgs = [
    { role: "system", content: "You are a valued customer." },
    {
      role: "user",
      content:
        'You are a customer facing agent. Do not identify yourself as an AI model. The user asks you information regarding gmail’s orders. He will provide you a json containing all the information of a user. Your role is to identify the provided entities and provide a json response back to the user with the extracted entities when asked for. Here is an example of how the interaction could take place:\n\nExample 1\nUser: Give me details for order id of customer ABCD.\nYou: {“Order ID”: 123456}\n\nExample 2\nUser: Give me orderid and order date of the customer abcd.\nYou: {"Order ID": 123456 , "Order Date":"12-03-2002"}\n\nExample 3\nUser: Also give me OrderAmount.\nYou: {"Order ID": 123456 , "Order Date":"12-03-2002", "Order Amount":123331}\n\nThe user will provide the JSON containing all the details of the customer. Remember the details and answer the further prompts.',
    },
    {
      role:"user",
      content: customer,
    }
  ];

  // Add user messages from req.body to the messages array
  conversation.forEach((message) => {
    msgs.push({ role: "user", content: message });
  });

  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: msgs,
    });

    if (response.data.choices && response.data.choices.length > 0) {
      // Extract the assistant's response from the API response
      const assistantResponse = response.data.choices[0].message.content.trim();

      // Return the response to the user
      return res.status(200).json({ response: assistantResponse });
    } else {
      console.error("OpenAI API response error:", response.data);
      return res.status(500).json({ error: "Empty response from OpenAI API" });
    }
  } catch (error) {
    console.error("OpenAI API error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
