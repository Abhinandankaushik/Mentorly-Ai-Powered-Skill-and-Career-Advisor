import { create } from "zustand";

const useResponseStore = create((set) => ({
  response: [],
  addResponse: (newRes) =>
    set((state) => ({
      response: [...state.response, newRes],
    })),


    // for future implementation
  clearResponse: () => set({ response: [] }),


  getResponse: (q) =>
    set((state) => ({
      ...state,
      response: [...state.response, q],
    })),
}));

export default useResponseStore;
