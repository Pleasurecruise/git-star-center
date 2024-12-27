import { create } from "zustand";
import { persist } from 'zustand/middleware';
import api from '@/utils/axios';
import { parseQuery } from '@/utils';

export interface InteractionSearchState {
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

export interface IInteractionSearch {
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
    interactionSearch: InteractionSearchState[];
    iInteractionSearch: IInteractionSearch[];
    page: number;
    total: number;
    isLoading: boolean;
    error: string | null;
    setStarMeSearch: (interactionSearch: InteractionSearchState[]) => void;
    setForkMeSearch: (interactionSearch: InteractionSearchState[]) => void;
    setWatchMeSearch: (interactionSearch: InteractionSearchState[]) => void;
    setFollowSearch: (interactionSearch: InteractionSearchState[]) => void;
    setIStarSearch: (interactionSearch: InteractionSearchState[]) => void;
    setIForkSearch: (interactionSearch: InteractionSearchState[]) => void;
    setIWatchSearch: (interactionSearch: InteractionSearchState[]) => void;
    setIFollowSearch: (interactionSearch: InteractionSearchState[]) => void;
    getStarMeSearch: (params: { page: number; pageSize: number; }) => Promise<void>;
    getForkMeSearch: (params: { page: number; pageSize: number; }) => Promise<void>;
    getWatchMeSearch: (params: { page: number; pageSize: number; }) => Promise<void>;
    getFollowSearch: (params: { page: number; pageSize: number; }) => Promise<void>;
    getIStarSearch: (params: { page: number; pageSize: number; }) => Promise<void>;
    getIForkSearch: (params: { page: number; pageSize: number; }) => Promise<void>;
    getIWatchSearch: (params: { page: number; pageSize: number; }) => Promise<void>;
    getIFollowSearch: (params: { page: number; pageSize: number; }) => Promise<void>;
}

export const useInteractionSearchStore = create<StoreState>()(
    persist(
        (set) => ({
            interactionSearch: [],
            iInteractionSearch: [],
            page: 1,
            total: 0,
            isLoading: false,
            error: null,
            setStarMeSearch: (interactionSearch) => set({ interactionSearch }),
            setForkMeSearch: (interactionSearch) => set({ interactionSearch }),
            setWatchMeSearch: (interactionSearch) => set({ interactionSearch }),
            setFollowSearch: (interactionSearch) => set({ interactionSearch }),
            setIStarSearch: (iInteractionSearch) => set({ iInteractionSearch }),
            setIForkSearch: (iInteractionSearch) => set({ iInteractionSearch }),
            setIWatchSearch: (iInteractionSearch) => set({ iInteractionSearch }),
            setIFollowSearch: (iInteractionSearch) => set({ iInteractionSearch }),
            getStarMeSearch: async ({ page, pageSize }) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.get('/user/starred-repositories?' + parseQuery({ page, pageSize }));
                    const { records, current, total } = response.data;
                    const formattedRecords = records.map((repo: any) => ({
                        ...repo,
                        updatedAt: new Date(repo.updatedAt).toLocaleString(),
                    }));
                    set({
                        interactionSearch: formattedRecords,
                        page: current,
                        total: total,
                        isLoading: false,
                    });
                } catch (error) {
                    console.error("Error fetching starred repositories:", error);
                    if (error instanceof Error) {
                        set({ error: error.message, isLoading: false });
                    }
                }
            },
            getForkMeSearch: async ({ page, pageSize }) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.get('/user/forked-repositories?' + parseQuery({ page, pageSize }));
                    const { records, current, total } = response.data;
                    const formattedRecords = records.map((repo: any) => ({
                        ...repo,
                        updatedAt: new Date(repo.updatedAt).toLocaleString(),
                    }));
                    set({
                        interactionSearch: formattedRecords,
                        page: current,
                        total: total,
                        isLoading: false,
                    });
                } catch (error) {
                    console.error("Error fetching forked repositories:", error);
                    if (error instanceof Error) {
                        set({ error: error.message, isLoading: false });
                    }
                }
            },
            getWatchMeSearch: async ({ page, pageSize }) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.get('/user/watched-repositories?' + parseQuery({ page, pageSize }));
                    const { records, current, total } = response.data;
                    const formattedRecords = records.map((repo: any) => ({
                        ...repo,
                        updatedAt: new Date(repo.updatedAt).toLocaleString(),
                    }));
                    set({
                        interactionSearch: formattedRecords,
                        page: current,
                        total: total,
                        isLoading: false,
                    });
                } catch (error) {
                    console.error("Error fetching watched repositories:", error);
                    if (error instanceof Error) {
                        set({ error: error.message, isLoading: false });
                    }
                }
            },
            getFollowSearch: async ({ page, pageSize }) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.get('/user/followed-repositories?' + parseQuery({ page, pageSize }));
                    const { records, current, total } = response.data;
                    const formattedRecords = records.map((repo: any) => ({
                        ...repo,
                        updatedAt: new Date(repo.updatedAt).toLocaleString(),
                    }));
                    set({
                        interactionSearch: formattedRecords,
                        page: current,
                        total: total,
                        isLoading: false,
                    });
                } catch (error) {
                    console.error("Error fetching followed repositories:", error);
                    if (error instanceof Error) {
                        set({ error: error.message, isLoading: false });
                    }
                }
            },
            getIStarSearch: async ({ page, pageSize }) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.get('/user/star-repositories?' + parseQuery({ page, pageSize }));
                    const { records, current, total } = response.data;
                    const formattedRecords = records.map((repo: any) => ({
                        ...repo,
                        updatedAt: new Date(repo.updatedAt).toLocaleString(),
                    }));
                    set({
                        iInteractionSearch: formattedRecords,
                        page: current,
                        total: total,
                        isLoading: false,
                    });
                } catch (error) {
                    console.error("Error fetching IStar repositories:", error);
                    if (error instanceof Error) {
                        set({ error: error.message, isLoading: false });
                    }
                }
            },
            getIForkSearch: async ({ page, pageSize }) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.get('/user/fork-repositories?' + parseQuery({ page, pageSize }));
                    const { records, current, total } = response.data;
                    const formattedRecords = records.map((repo: any) => ({
                        ...repo,
                        updatedAt: new Date(repo.updatedAt).toLocaleString(),
                    }));
                    set({
                        iInteractionSearch: formattedRecords,
                        page: current,
                        total: total,
                        isLoading: false,
                    });
                } catch (error) {
                    console.error("Error fetching IFork repositories:", error);
                    if (error instanceof Error) {
                        set({ error: error.message, isLoading: false });
                    }
                }
            },
            getIWatchSearch: async ({ page, pageSize }) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.get('/user/watch-repositories?' + parseQuery({ page, pageSize }));
                    const { records, current, total } = response.data;
                    const formattedRecords = records.map((repo: any) => ({
                        ...repo,
                        updatedAt: new Date(repo.updatedAt).toLocaleString(),
                    }));
                    set({
                        iInteractionSearch: formattedRecords,
                        page: current,
                        total: total,
                        isLoading: false,
                    });
                } catch (error) {
                    console.error("Error fetching IWatch repositories:", error);
                    if (error instanceof Error) {
                        set({ error: error.message, isLoading: false });
                    }
                }
            },
            getIFollowSearch: async ({ page, pageSize }) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.get('/user/follow-repositories?' + parseQuery({ page, pageSize }));
                    const { records, current, total } = response.data;
                    const formattedRecords = records.map((repo: any) => ({
                        ...repo,
                        updatedAt: new Date(repo.updatedAt).toLocaleString(),
                    }));
                    set({
                        iInteractionSearch: formattedRecords,
                        page: current,
                        total: total,
                        isLoading: false,
                    });
                } catch (error) {
                    console.error("Error fetching IFollow repositories:", error);
                    if (error instanceof Error) {
                        set({ error: error.message, isLoading: false });
                    }
                }
            },
        }),
        {
            name: 'interactionSearch-storage', // unique name for the storage
        }
    )
);
