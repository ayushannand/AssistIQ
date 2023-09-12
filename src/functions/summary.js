import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { chatLog } = req.body;

  try {
    // Prepare messages with increased weight for newer messages
    const messages = chatLog.map((message, index) => {
      return {
        role: message.role,
        content: message.content,
        index: index + 1, // Increase the index to give more weight to newer messages
      };
    });

    // Call OpenAI's API for chat completion
    const response = await openai.chatCompletion.create({
      model: "gpt-3.5-turbo",
      messages,
      max_tokens: 50, // Adjust the summary length as desired
    });

    if (response.choices && response.choices.length > 0) {
      const summary = response.choices[0].message.content.trim();
      return res.status(200).json({ summary });
    } else {
      console.error("OpenAI API response error:", response);
      return res.status(500).json({ error: "Empty response from OpenAI API" });
    }
  } catch (error) {
    console.error("OpenAI API error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
