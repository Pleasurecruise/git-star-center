import { create } from 'zustand'
import { persist } from "zustand/middleware";

interface UserState {
    token: string;
    setToken: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<UserState>()(
    persist(
        (set) => ({
            token: '',
            setToken: (token: string) => set({token}),
            logout: () => set({token: ''})
        }),
        {
            name: 'auth-storage', // unique name for the storage
        }
    )
);
