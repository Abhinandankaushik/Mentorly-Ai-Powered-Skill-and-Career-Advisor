import { GoogleGenAI, Type } from "@google/genai";



const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_APP_API_KEY});

const roadmapSchema = {
    type: Type.OBJECT,
    properties: {
        nodes: {
            type: Type.ARRAY,
            description: "A list of steps or milestones in the career path.",
            items: {
                type: Type.OBJECT,
                properties: {
                    id: {
                        type: Type.STRING,
                        description: "A unique, snake_case identifier for the node (e.g., 'learn_python')."
                    },
                    label: {
                        type: Type.STRING,
                        description: "A short, human-readable title for the step (e.g., 'Learn Python')."
                    },
                    description: {
                        type: Type.STRING,
                        description: "A one-sentence explanation of what this step involves."
                    }
                },
                required: ["id", "label", "description"],
            },
        },
        links: {
            type: Type.ARRAY,
            description: "A list of connections between nodes, representing prerequisites.",
            items: {
                type: Type.OBJECT,
                properties: {
                    source: {
                        type: Type.STRING,
                        description: "The 'id' of the prerequisite node."
                    },
                    target: {
                        type: Type.STRING,
                        description: "The 'id' of the node that depends on the source."
                    }
                },
                required: ["source", "target"],
            },
        }
    },
    required: ["nodes", "links"],
};


export const generateRoadmap = async (careerGoal) => {
    const prompt = `Generate a detailed, step-by-step career roadmap for becoming a "${careerGoal}". The roadmap should be structured as a directed graph. Create a series of logical steps (nodes) and the dependencies between them (links). Start from foundational skills and progress to advanced topics and career development. Ensure all node IDs in the links exist in the nodes list.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: roadmapSchema,
            },
        });

        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);
        
        // Basic validation
        if (!parsedData.nodes || !parsedData.links) {
            throw new Error("Invalid data structure received from AI.");
        }
        
        return parsedData;

    } catch (error) {
        console.error("Error generating roadmap from Gemini API:", error);
        throw new Error("Failed to generate career roadmap. The AI service may be experiencing issues.");
    }
};