// File: pages/api/query.js
import { Configuration, OpenAIApi } from "openai";
import customers from "../../assets/database.js";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { email } = req.query;
  const { conversation } = req.body;

  const customer = customers.find((c) => c.email === email);
  if (!customer) return res.status(404).json({ error: "Customer not found" });

  const promptMsgs = require("../../assets/prompt.js");
  const teamPromptMsgs = require("../../assets/teamPrompt.js");
  let msgs;

  const customerEmail = customer && customer.email.toLowerCase();
  if (customerEmail && (customerEmail.includes("all@"))) {
    msgs = [...teamPromptMsgs];
  }else{
    msgs = [...promptMsgs];
  }

  if (customer) msgs.push({ role: "user", content: JSON.stringify(customer) });
  msgs.push(...conversation);

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: msgs,
    });
    if (response.data.choices && response.data.choices.length > 0) {
      const assistantResponse = response.data.choices[0].message.content.trim();
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