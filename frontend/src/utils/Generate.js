import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_APP_API_KEY });

let intro = "your are a career or skill adviso/guide/tutor, where you have to answer the given query according to the instruction provided.";
let query = "";
let instruction = "INSTRUCTION: answer in object where decsription is basically your opnion that how you frame your answer and it should look motivate,use little emoji here and  phases is array of different phases. Each phase consist of title which gives overall idea of the phase, phaseDescription which gives details of each phase, steps which is array of string aka step or point, searchPrompt which is basically a propmt that i can search on youtube to get tutorial for that career or skill easily, at last there is name which is basically a specific word or sentence that we can refer as the name of skill or career.";


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
              },
              propertyOrdering: ["title", "phaseDescription","steps"],
            }
          },
          searchPrompt: {
            type: Type.STRING,
          },
          name: {
            type: Type.STRING,
          }
        },
        propertyOrdering: ["description","phases","searchPrompt","name"],
      },
    },
  });

  let res = JSON.parse(response.text);
  return res;
}

async function generateResponse(q){
  query = q;
  let res = await main();
  console.log(res);
  return res;
}
export default generateResponse;






//https://www.googleapis.com/youtube/v3/search?part=snippet&q=YOUR_SEARCH_QUERY&order=viewCount&maxResults=5&key=AIzaSyAxg7C5DVhpODw3XpL2q2bjjcd_HKgV538