const { getAIResponse } = require("../utils/aiService");

const askAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const reply = await getAIResponse(message);

    res.status(200).json({
      success: true,
      reply: reply,
    });

  } catch (error) {
    console.error("AI Assistant Error:", error);

    res.status(500).json({
      success: false,
      message: "AI Assistant could not process your request.",
    });
  }
};

module.exports = {
  askAI,
};