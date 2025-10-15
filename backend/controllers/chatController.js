const axios = require("axios");
const geminiConfig = require("../config/geminiConfig");
const { success, error } = require("../utils/responseHelper");

exports.chat = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json(error("No message provided"));
    }
    const prompt = {
      contents: [
        {
          role: "system",
          parts: [
            {
              text: "You are an AI assistant specialized in Cleft Lip Syndrome. Answer user questions helpfully.",
            },
          ],
        },
        { role: "user", parts: [{ text: message }] },
      ],
    };
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${geminiConfig.model}:generateContent?key=${geminiConfig.apiKey}`,
      prompt
    );
    const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    res.json(success({ reply: aiText }));
  } catch (err) {
    next(err);
  }
};
