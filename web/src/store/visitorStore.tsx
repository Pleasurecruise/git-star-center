/**
 * @license MIT
 * Created by: joetao
 * Created on: 2024/12/3
 * Project: xryder
 * Description: This is a rapid development template for middle and backend UI based on vite, react, tailwindcss and shadcn.
 */
import { create } from 'zustand'
import api from '@/utils/axios'

/**
 * 埋点数据
 */
export const useVisitorStore = create<{
    count: number;
    visit: (params: Record<string, unknown>) => Promise<void>;
    uv: () => Promise<void>;
}>((set) => ({
    count: 0,
    visit: async (params: Record<string, unknown>) => {
        try {
            await api.post('/visitor', params);
        } catch (err: unknown) {
            console.log(err)
        }
    },
    uv: async () => {
        const data: { data: number } = await api.get('/uv');
        set({
            count: data.data
        })
    }
}))
