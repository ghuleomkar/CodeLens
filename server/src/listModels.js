require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function listModels() {
  try {
    const models = await ai.models.list();

    for await (const model of models) {
      console.log(model.name);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

listModels();