import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_APP_API_KEY });

let intro = "your are a career or skill adviso/guide/tutor, where you have to answer the given query according to the instruction provided.";
let query = "";
let instruction = "INSTRUCTION: answer in object where decsription is basically your opnion that how you frame your answer and it should look motivate,use little emoji here and  phases is array of different phases. Each phase consist of title which gives overall idea of the phase, phaseDescription which gives details of each phase, steps which is array of string aka step or point,at last searchPrompt which is basically a propmt that i can search on youtube to get tutorial for that phase easily.";


async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:
      `${intro} ${query} ${instruction}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {//phases
        type: Type.OBJECT,
        properties:{
          description: {
            type :Type.STRING,
          },
          phases: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: {
                type: Type.STRING,
                },
                phaseDescription: {
                  type: Type.STRING,
                },
                steps:{
                    type: Type.ARRAY,
                    items: {
                        type: Type.STRING,
                    }
                },
                searchPrompt: {
                    type: Type.STRING,
                }
              },
              propertyOrdering: ["title", "phaseDescription","steps","searchPrompt"],
            }
          }
        },
        propertyOrdering: ["description","phases"],
      },
    },
  });

  let res = JSON.parse(response.text);
  return res;
}

async function generateResponse(q){
  query = q;
  let res = await main();
  return res;
}
export default generateResponse;






//https://www.googleapis.com/youtube/v3/search?part=snippet&q=YOUR_SEARCH_QUERY&order=viewCount&maxResults=5&key=AIzaSyAxg7C5DVhpODw3XpL2q2bjjcd_HKgV538