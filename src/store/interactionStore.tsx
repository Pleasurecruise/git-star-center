import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/utils/axios.ts";
import {AxiosError} from "axios";


export interface InteractionState {
    sourceUserId: number;
    targetUserId: number;
    isStar: boolean;
    isFork: boolean;
    isWatch: boolean;
    isFollow: boolean;
    updatedAt: string;
}

interface StoreState {
    interaction: InteractionState;
    isLoading: boolean;
    error: string | null;
    repoAuth: string;
    repoName: string;
    setInteraction: (interaction: InteractionState) => void;
    toggleStar: () => Promise<void>;
    toggleFork: () => Promise<void>;
    toggleWatch: () => Promise<void>;
    toggleFollow: (username: string) => Promise<void>;
    getInteraction: (params: { repoAuth: string, repoName: string }) => Promise<void>;
}

export const useInteractionStore = create<StoreState>()(
    persist(
        (set, get) => ({
            interaction: {
                isStar: false,
                isFork: false,
                isWatch: false,
                isFollow: false,
                sourceUserId: 0,
                targetUserId: 0,
                updatedAt: ""
            },
            isLoading: false,
            error: null,
            repoAuth: "",
            repoName: "",
            setInteraction: (interaction) => set({ interaction }),
            getInteraction: async (params) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.get('/interactions', {
                        params: {
                            repoAuth: params.repoAuth,
                            repoName: params.repoName,
                        },
                    });
                    const { data } = response;
                    console.log("data", data);
                    if (data) {
                        set({
                            interaction: {
                                isStar: data.isStar,
                                isFork: data.isFork,
                                isWatch: data.isWatch,
                                isFollow: data.isFollow,
                                sourceUserId: data.sourceUserId,
                                targetUserId: data.targetUserId,
                                updatedAt: data.updatedAt || "",
                            },
                            isLoading: false,
                        });
                    } else {
                        set({
                            interaction: {
                                isStar: false,
                                isFork: false,
                                isWatch: false,
                                isFollow: false,
                                sourceUserId: 0,
                                targetUserId: 0,
                                updatedAt: "",
                            },
                            isLoading: false,
                        });
                    }
                } catch (error) {
                    console.error("Error fetching interactions:", error);
                    if (error instanceof AxiosError) {
                        set({ error: error.response?.data?.msg || error.message, isLoading: false });
                    } else if (error instanceof Error) {
                        set({ error: error.message, isLoading: false });
                    }
                }
            },
            toggleStar: async () => {
                const { interaction } = get();
                try {
                    if (interaction.isStar) {
                        await api.post('/unstar', null, { params: { repoAuth: get().repoAuth, repoName: get().repoName, sourceUserId: interaction.sourceUserId, targetUserId: interaction.targetUserId } });
                    } else {
                        await api.post('/star', null, { params: { repoAuth: get().repoAuth, repoName: get().repoName, sourceUserId: interaction.sourceUserId, targetUserId: interaction.targetUserId } });
                    }
                    set((state) => ({
                        interaction: { ...state.interaction, isStar: !state.interaction.isStar },
                    }));
                } catch (error) {
                    console.error("Error toggling star:", error);
                    if (error instanceof AxiosError) {
                        set({ error: error.response?.data?.msg || error.message });
                    } else if (error instanceof Error) {
                        set({ error: error.message });
                    }
                }
            },
            toggleFork: async () => {
                const { interaction } = get();
                try {
                    if (interaction.isFork) {
                        await api.post('/unfork', null, { params: { repoAuth: get().repoAuth, repoName: get().repoName, sourceUserId: interaction.sourceUserId, targetUserId: interaction.targetUserId } });
                    } else {
                        await api.post('/fork', null, { params: { repoAuth: get().repoAuth, repoName: get().repoName, sourceUserId: interaction.sourceUserId, targetUserId: interaction.targetUserId } });
                    }
                    set((state) => ({
                        interaction: { ...state.interaction, isFork: !state.interaction.isFork },
                    }));
                } catch (error) {
                    console.error("Error toggling fork:", error);
                    if (error instanceof AxiosError) {
                        set({ error: error.response?.data?.msg || error.message });
                    } else if (error instanceof Error) {
                        set({ error: error.message });
                    }
                }
            },
            toggleWatch: async () => {
                const { interaction } = get();
                try {
                    if (interaction.isWatch) {
                        await api.post('/unwatch', null, { params: { repoAuth: get().repoAuth, repoName: get().repoName, sourceUserId: interaction.sourceUserId, targetUserId: interaction.targetUserId } });
                    } else {
                        await api.post('/watch', null, { params: { repoAuth: get().repoAuth, repoName: get().repoName, sourceUserId: interaction.sourceUserId, targetUserId: interaction.targetUserId } });
                    }
                    set((state) => ({
                        interaction: { ...state.interaction, isWatch: !state.interaction.isWatch },
                    }));
                } catch (error) {
                    console.error("Error toggling watch:", error);
                    if (error instanceof AxiosError) {
                        set({ error: error.response?.data?.msg || error.message });
                    } else if (error instanceof Error) {
                        set({ error: error.message });
                    }
                }
            },
            toggleFollow: async (targetUsername: string) => {
                const { interaction } = get();
                try {
                    if (interaction.isFollow) {
                        await api.post('/unfollow', null, { params: { sourceUserId: interaction.sourceUserId, targetUsername } });
                    } else {
                        await api.post('/follow', null, { params: { sourceUserId: interaction.sourceUserId, targetUsername } });
                    }
                    set((state) => ({
                        interaction: { ...state.interaction, isFollow: !state.interaction.isFollow },
                    }));
                } catch (error) {
                    console.error("Error toggling follow:", error);
                    if (error instanceof AxiosError) {
                        set({ error: error.response?.data?.msg || error.message });
                    } else if (error instanceof Error) {
                        set({ error: error.message });
                    }
                }
            },
        }),
        {
            name: 'interaction-storage', // unique name for the storage
        }
    )
);
