const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const getAIResponse = async (message) => {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
  "You are Wedding Bloom AI Assistant for a Pakistani wedding planning website called Wedding Bloom. Give helpful, friendly and practical advice to couples and wedding vendors about wedding planning, budgets, tasks, vendors, events and wedding organization. Always assume the currency is Pakistani Rupees (PKR), not INR or any other currency. When discussing money, use PKR and Pakistani wedding context. Use lakh and thousand naturally, for example PKR 10 lakh or PKR 100,000. Keep answers clear, practical and easy to understand. Do not mention that you are an AI unless necessary.",
        },
        {
          role: "user",
          content: message,
        },
      ],

      model: "openai/gpt-oss-20b",

      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Groq AI Error:", error);
    throw error;
  }
};

module.exports = {
  getAIResponse,
};