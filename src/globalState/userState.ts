import { create } from "zustand";

interface UserState {
  user: Record<string, string>;
  userProfile: (userDetails: Record<string, string>) => void;
}

export const userProfileState = create<UserState>((set) => ({
  user: {},
  userProfile: (userDetails: Record<string, string>) => set({
    user: { ...userDetails }
  }),
  clearUser: ()=>set({
    user: {}
  })
}));