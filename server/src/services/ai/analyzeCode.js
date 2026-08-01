require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const analyzeCode = async (codeChunk) => {
  const prompt = `
You are an expert software engineer and code reviewer.

Analyze the following source code and provide a concise code review.

Focus on:
1. Bugs and potential runtime errors
2. Security vulnerabilities
3. Performance issues
4. Code quality
5. Best practices
6. Specific improvements

File Path:
${codeChunk.path}

Source Code:
${codeChunk.content}

Return the review in this format:

Summary:
<short summary>

Issues:
- <issue 1>
- <issue 2>

Suggestions:
- <suggestion 1>
- <suggestion 2>
`;

  const MAX_RETRIES = 3;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(
        `AI request attempt ${attempt}/${MAX_RETRIES}`
      );

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      console.log("AI response received");

      return {
        path: codeChunk.path,
        review: response.text,
      };

    } catch (error) {

      const errorMessage = 
      error.message || "Unknown Gemini API error";

      console.error(
        `AI analysis failed for ${codeChunk.path}:`,
        errorMessage
      );

      if (attempt === MAX_RETRIES) {

        if(
          errorMessage.includes("429") ||
          errorMessage.toLowerCase().includes("quota")
        ) {
          throw new Error(
            "Gemini API quota exceeded. Please try again later."
          )
        }

        if(
          errorMessage.includes("401") ||
          errorMessage.toLowerCase().includes("api key")
        ){
          throw new Error(
            "Invalid Gemini API key"
          )
        }

        throw new Error(
          "Failed to analyze repository using AI"
        )
      }

      const waitTime = attempt * 3000;

      console.log(
        `Retrying in ${waitTime / 1000} seconds...`
      );

      await sleep(waitTime);
    }
  }
};

module.exports = analyzeCode;