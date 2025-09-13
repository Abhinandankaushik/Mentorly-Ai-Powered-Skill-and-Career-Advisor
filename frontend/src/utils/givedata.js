import { GoogleGenAI } from "@google/genai";

// Initialize the AI client with your API key
const ai = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_APP_API_KEY 
});

export const fetchCareerData = async (jobTitle) => {
  // Use a precise prompt to ensure the AI generates the correct data.
  const userPrompt = `Generate fictional but realistic statistical data and a description for a "${jobTitle}" career. Provide data for the last 5 years. The year should be a number (e.g., 2020), students, hiring, and successRate should also be numbers.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Use the same model as your first code
      contents: [{ parts: [{ text: userPrompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            "description": { 
              type: "STRING" 
            },
            "stats": {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  "year": { type: "NUMBER" },
                  "students": { type: "NUMBER" },
                  "hiring": { type: "NUMBER" },
                  "successRate": { type: "NUMBER" }
                }
              }
            }
          },
          propertyOrdering: ["description", "stats"]
        },
      },
    });

    // The SDK should automatically parse the JSON response
    // response.text contains the JSON string, we need to parse it
    const result = JSON.parse(response.text);
    return result;

  } catch (error) {
    console.error('Error fetching data from Gemini API:', error);
    // Return a structured error object or a default value
    return {
      description: "Could not retrieve data for this career. Please try again.",
      stats: []
    };
  }
};