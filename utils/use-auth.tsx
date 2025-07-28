import { User } from "@/types/interface";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (user: User) => {
    set(() => ({
      user,
      isAuthenticated: true,
    }));
  },
  logout: () => {
    set(() => ({
      user: null,
      isAuthenticated: false,
    }));
  },
}));

export default useAuth;
