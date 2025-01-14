import { create } from "zustand";
import { persist } from "zustand/middleware";
import { marked } from "marked";

interface ReadmeState {
    readmeContent: string;
    readmeError: boolean;
    fetchReadme: (params: { repoAuth: string, repoName: string }) => Promise<void>;
}

export const useReadmeStore = create<ReadmeState>()(
    persist(
        (set) => ({
            readmeContent: "",
            readmeError: false,
            fetchReadme: async (params) => {
                const apiUrl = `https://api.github.com/repos/${params.repoAuth}/${params.repoName}/readme`;
                try {
                    const response = await fetch(apiUrl);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    const content = atob(data.content);
                    const decodedContent = new TextDecoder("utf-8").decode(new Uint8Array([...content].map(char => char.charCodeAt(0))));
                    const updatedContent = decodedContent.replace(/!\[([^\]]*)]\(([^)]+)\)/g, (match, alt, path) => {
                        if (!path.startsWith('http')) {
                            return `![${alt}](https://raw.githubusercontent.com/${params.repoAuth}/${params.repoName}/main/${path})`;
                        }
                        return match;
                    });
                    const htmlContent = marked(updatedContent);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    set({ readmeContent: htmlContent, readmeError: false });
                } catch (error) {
                    console.error('Error fetching README:', error);
                    set({ readmeContent: 'Error fetching README', readmeError: true });
                }
            }
        }),
        {
            name: 'readme-storage', // unique name for the storage
        }
    )
);
