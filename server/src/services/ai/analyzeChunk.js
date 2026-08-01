const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-3.5-flash",
});

const analyzeChunk = async (chunk) => {
  const prompt = `
You are an expert software engineer and code reviewer.

Analyze the following source code carefully.

File Path:
${chunk.path}

File Extension:
${chunk.extension}

Source Code:
\`\`\`
${chunk.content}
\`\`\`

Find:
1. Bugs
2. Security vulnerabilities
3. Performance issues
4. Code quality issues
5. Best practice violations

Return ONLY valid JSON in this exact format:

{
  "file": "${chunk.path}",
  "issues": [
    {
      "title": "Short issue title",
      "description": "Detailed explanation",
      "severity": "low | medium | high | critical",
      "line": null,
      "suggestion": "How to fix it"
    }
  ]
}

If there are no issues, return:

{
  "file": "${chunk.path}",
  "issues": []
}
`;

  try {
    const result = await model.generateContent(prompt);

    const response = result.response.text();

    const cleanedResponse = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error(
      `AI analysis failed for ${chunk.path}:`,
      error.message
    );

    return {
      file: chunk.path,
      issues: [],
      error: error.message,
    };
  }
};

module.exports = analyzeChunk;