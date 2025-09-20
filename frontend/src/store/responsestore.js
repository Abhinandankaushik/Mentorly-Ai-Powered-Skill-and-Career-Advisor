import { create } from "zustand";

const useStore = create((set, get) => ({
  response: [],
  questions: [],

  // Response methods
  addResponse: (newRes) =>
    set((state) => ({
      response: [...state.response, newRes],
    })),

  clearResponse: () => set({ response: [] }),

  getResponses: () => get().response, // <-- getter (read only, no set)

  // Question methods
  addQuestion: (newQ) =>
    set((state) => ({
      questions: [...state.questions, newQ],
    })),

  clearQuestions: () => set({ questions: [] }),

  getQuestions: () => get().questions,
}));

export default useStore;
