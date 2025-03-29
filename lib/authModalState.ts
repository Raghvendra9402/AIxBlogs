import { create } from "zustand";

type AuthModalType = "login" | "register";

interface AuthenticationModalState {
  isOpen: boolean;
  type: AuthModalType;
  openModal: (type: AuthModalType) => void;
  closeModal: () => void;
}

export const useAuthModalStore = create<AuthenticationModalState>((set) => ({
  isOpen: true,
  type: "login",
  openModal: (type: AuthModalType) => set({ isOpen: true, type }),
  closeModal: () => set({ isOpen: false }),
}));
