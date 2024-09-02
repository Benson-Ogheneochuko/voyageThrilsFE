import { create } from "zustand";

type Tfeedback = 'error' | 'info' | 'success'

interface Ifeedback {
  message: string
  type?: Tfeedback | null
  isVisible: boolean
  showFeedback: (message: string, type: Tfeedback) => void
  hideFeedback: ()=> void
}

export const useFeedbackStore = create<Ifeedback>((set) => ({
  message: "",
  type: null,
  isVisible: false,
  showFeedback: (message, type) => {
    set({ message, type, isVisible: true });
  },
  hideFeedback: () => set({ isVisible: false })
}))