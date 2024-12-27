import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from '@/utils/axios';
import { parseQuery } from '@/utils';

export interface RepositoryState {
    id: number;
    userId: number;
    username: string;
    repoAuth: string;
    repoName: string;
    repoBio: string;
    starCount: number;
    forkCount: number;
    watchCount: number;
    followerCount: number;
    language: string;
    updatedAt: string;
}

interface StoreState {
    repository: RepositoryState[];
    page: number;
    totalPages: number;
    isLoading: boolean;
    error: string | null;
    setRepository: (repository: RepositoryState[]) => void;
    getRepository: (params: { page: number }) => Promise<void>;
}

export const useRepositoryStore = create<StoreState>()(
    persist(
        (set) => ({
            repository: [],
            page: 1,
            totalPages: 1,
            isLoading: false,
            error: null,
            setRepository: (repository) => set({ repository }),
            getRepository: async (params) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.get('/repositories?' + parseQuery(params));
                    const { records, current, pages } = response.data;
                    const formattedRecords = records.map((repo: any) => ({
                        ...repo,
                        updatedAt: new Date(repo.updatedAt).toLocaleString(),
                    }));
                    set({
                        repository: formattedRecords,
                        page: current,
                        totalPages: pages,
                        isLoading: false,
                    });
                } catch (error) {
                    console.log("Error", error);
                    if (error instanceof Error) {
                        set({ error: error.message, isLoading: false });
                    }
                }
            }
        }),
        {
            name: 'repository-storage', // unique name for the storage
        }
    )
);
