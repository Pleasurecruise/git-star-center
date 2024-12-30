import { create } from 'zustand'
import api from '@/utils/axios'
import { parseQuery } from '@/utils'
import { persist } from "zustand/middleware";
import {AxiosError} from "axios";

/**
 * 用于储存自己仓库的数据
 */
export interface AccountState {
    id: number
    username: string
    nickname: string
    newMails: number
    email: string
    avatar: string
    repoAuth: string
    repoName: string
    repoBio: string
    starCount: number
    forkCount: number
    watchCount: number
    followerCount: number
    repoUpdateTime: string
}

/**
 * 用于储存目标仓库的数据
 */
interface targetAccountState {
    id: number
    username: string
    nickname: string
    email: string
    avatar: string
    repoAuth: string
    repoName: string
    repoBio: string
    starCount: number
    forkCount: number
    watchCount: number
    followerCount: number
    repoUpdateTime: string
}

interface MailState {
    id: number
    title: string
    content: string
    hasRead: boolean
    createTime: string
}

interface StoreState {
    account: AccountState;
    mails: MailState[];
    targetAccount: targetAccountState;
    isLoading: boolean;
    saving: boolean;
    changing: boolean;
    deleting: boolean;
    error: string | null;
    setAccount: (account: AccountState) => void;
    setTargetAccount: (account: targetAccountState) => void;
    setMails: (mails: MailState[]) => void;
    getAccount: () => Promise<AccountState>;
    getMails: (params: Record<string, unknown>) => Promise<void>;
    readMail: (params: { id: number }) => Promise<void>;
    unreadMail: (params: { id: number }) => Promise<void>;
    deleteMail: (params: { id: number }) => Promise<void>;
    updateAccount: (params: { nickname: string; email: string }) => Promise<{ code: number, msg: string }>;
    changeRepository: (params: { repoAuth: string; repoName: string }) => Promise<{ code: number, msg: string }>;
    getTargetAccount: (params: { repoAuth: string, repoName: string }) => Promise<targetAccountState>;
}

export const useAccountStore = create<StoreState>()(
    persist(
        (set) => ({
            account: {
                id: 0,
                username: '',
                nickname: '',
                newMails: 0,
                email: '',
                avatar: '',
                repoAuth: '',
                repoName: '',
                repoBio: '',
                starCount: 0,
                forkCount: 0,
                watchCount: 0,
                followerCount: 0,
                repoUpdateTime: ''
            },
            mails: [],
            targetAccount: {
                id: 0,
                username: '',
                nickname: '',
                email: '',
                avatar: '',
                repoAuth: '',
                repoName: '',
                repoBio: '',
                starCount: 0,
                forkCount: 0,
                watchCount: 0,
                followerCount: 0,
                repoUpdateTime: ''
            },
            isLoading: false,
            saving: false,
            changing: false,
            deleting: false,
            error: null,
            setAccount: (account) => set({ account }),
            setTargetAccount: (account) => set({ targetAccount: account }),
            setMails: (mails) => set({ mails }),
            getAccount: async () => {
                set({error: null});
                try {
                    const data = await api.get('/account');
                    set({
                        account: data.data,
                    });
                    return data.data;
                } catch (error) {
                    if (error instanceof Error) {
                        set({error: error.message});
                    }
                }
            },
            getTargetAccount: async (params) => {
                set({error: null});
                try {
                    const data = await api.get('/account/target?repoAuth=' + params.repoAuth + '&repoName=' + params.repoName);
                    set({
                        targetAccount: data.data,
                    });
                    return data.data;
                } catch (error) {
                    if (error instanceof Error) {
                        set({error: error.message});
                    }
                }
            },
            getMails: async (params) => {
                set({isLoading: true, error: null});
                try {
                    const data = await api.get('/mail?' + parseQuery(params));
                    set({
                        mails: data.data,
                        isLoading: false
                    });
                } catch (error) {
                    if (error instanceof Error) {
                        set({error: error.message, isLoading: false});
                    }
                }
            },
            readMail: async (params) => {
                set({error: null});
                try {
                    const data = await api.put('/mails/' + params.id +'/read');
                    if (data.data.code === 1) {
                        set((state) => ({
                            mails: state.mails.map(m => m.id === params.id ? {...m, hasRead: true} : m),
                            account: {...state.account, newMails: state.account.newMails -1 }
                        }));
                    }
                } catch (error) {
                    if (error instanceof Error) {
                        set({error: error.message});
                    }
                }
            },
            unreadMail: async (params) => {
                set({error: null});
                try {
                    const data = await api.put('/mails/' + params.id +'/unread');
                    if (data.data.code === 1) {
                        set((state) => ({
                            mails: state.mails.map(m => m.id === params.id ? {...m, hasRead: false} : m),
                            account: {...state.account, newMails: state.account.newMails +1 }
                        }));
                    }
                } catch (error) {
                    if (error instanceof Error) {
                        set({error: error.message});
                    }
                }
            },
            deleteMail: async (params) => {
                set({error: null, deleting: false});
                try {
                    const data = await api.delete('/mails/' + params.id);
                    if (data.data.code === 1) {
                        set((state) => ({
                            mails: state.mails.filter(m => m.id !== params.id),
                            deleting: false
                        }));
                    }
                } catch (error) {
                    if (error instanceof Error) {
                        set({error: error.message, deleting: false});
                    }
                }
            },
            updateAccount: async (params: { nickname: string; email: string }) => {
                set({saving: true, error: null});
                try {
                    const data = await api.post('/account', params);
                    set({
                        account: data.data,
                        saving: false,
                    });
                    return { code: 1, msg: 'success'};
                } catch (error: unknown) {
                    if (error instanceof AxiosError) {
                        set({saving: false, error: error.response?.data?.msg});
                        return { code: 0, msg: error.response?.data?.msg || 'error'};
                    } else {
                        set({saving: false, error: 'An unknown error occurred'});
                        return { code: 0, msg: 'An unknown error occurred'};
                    }

                }
            },
            changeRepository: async (params: { repoAuth: string; repoName: string }) => {
                set({changing: true, error: null});
                try {
                    const data = await api.post(`/bind-repository?repoAuth=${params.repoAuth}&repoName=${params.repoName}`);
                    set({
                        changing: false,
                        account: data.data,
                    });
                    return { code: 1, msg: 'success'};
                } catch (error: unknown) {
                    if (error instanceof AxiosError) {
                        set({changing: false,error: error.response?.data?.msg});
                        return { code: 0, msg: error.response?.data?.msg || 'error'};
                    } else{
                        set({changing: false,error: 'An unknown error occurred'});
                        return { code: 0, msg: 'An unknown error occurred'};
                    }
                }
            },
        }),
        {
            name: 'account-storage', // unique name for the storage
        }
    )
);
