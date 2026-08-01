const model = require("../../config/gemini");

const generateAIResponse = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);

    const response = result.response;

    return response.text();
  } catch (error) {
    console.error("Gemini AI Error:", error.message);
    throw error;
  }
};

module.exports = generateAIResponse;