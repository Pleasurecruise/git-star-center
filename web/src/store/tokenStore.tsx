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
            setToken: (token: string) => {
                set({ token });
                setTimeout(() => set({ token: '' }), 3600000); // 1 hour = 3600000 ms
            },
            logout: () => {
                set({ token: '' });
                window.location.href = '/login';
            }
        }),
        {
            name: 'auth-storage', // unique name for the storage
        }
    )
);
