import { create } from "zustand";

const useResponseStore = create((set) => ({
  response: [],

  
  addResponse: (newRes) =>
    set((state) => ({
      response: [...state.response, newRes],
    })),


  clearResponse: () => set({ response: [] }),

  
  getResponse: () =>
    set((state) => {
      return { response: state.response };
    }),
}));

export default useResponseStore;
