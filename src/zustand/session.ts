import { create } from "zustand";

import { UserProps, SessionStoreProps } from "../types";

const initialState = {
  session: null,
};

const useSessionStore = create<SessionStoreProps>((set) => ({
  ...initialState,
  setSession: (session: UserProps | null) => {
    set({ session });
  },
}));

export default useSessionStore;
