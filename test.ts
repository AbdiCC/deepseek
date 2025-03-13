require('dotenv').config()
const OpenAI = require("openai");

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY || "<YOUR_API_KEY>",
});

async function main() {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "deepseek-chat",
    });
    console.log("Response:", completion.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();