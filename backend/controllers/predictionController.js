const axios = require("axios");
const geminiConfig = require("../config/geminiConfig");
const { success, error } = require("../utils/responseHelper");

exports.predict = async (req, res, next) => {
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64) {
      return res.status(400).json(error("No image provided"));
    }
    // Gemini API call
    const prompt = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "You are an expert in Cleft Lip Syndrome. Analyze the ultrasound image and respond in JSON: { outcome, confidence, recommendation }.",
            },
            { inline_data: { mime_type: "image/png", data: imageBase64 } },
          ],
        },
      ],
    };
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${geminiConfig.model}:generateContent?key=${geminiConfig.apiKey}`,
      prompt
    );
    // Parse Gemini response
    const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    let result;
    try {
      result = JSON.parse(aiText);
    } catch {
      result = {
        outcome: "Unknown",
        confidence: 0,
        recommendation: "Could not parse AI response.",
      };
    }
    res.json(success(result));
  } catch (err) {
    next(err);
  }
};
