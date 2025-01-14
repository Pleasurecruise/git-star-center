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
                try {
                    // Fetch the default branch
                    const repoResponse = await fetch(`https://api.github.com/repos/${params.repoAuth}/${params.repoName}`);
                    const repoData = await repoResponse.json();
                    const defaultBranch = repoData.default_branch;
                    // Fetch the README content
                    const readmeResponse = await fetch(`https://api.github.com/repos/${params.repoAuth}/${params.repoName}/readme`);
                    const readmeData = await readmeResponse.json();
                    const content = atob(readmeData.content);
                    const decodedContent = new TextDecoder("utf-8").decode(new Uint8Array([...content].map(char => char.charCodeAt(0))));
                    // Update image paths
                    const updatedContent = decodedContent.replace(/!\[([^\]]*)]\(([^)]+)\)/g, (match, alt, path) => {
                        if (!path.startsWith('http')) {
                            return `![${alt}](https://raw.githubusercontent.com/${params.repoAuth}/${params.repoName}/${defaultBranch}/${path})`;
                        }
                        return match;
                    }).replace(/<img\s+[^>]*src="([^"]+)"[^>]*\/?>/g, (match, path) => {
                        if (!path.startsWith('http')) {
                            return match.replace(path, `https://raw.githubusercontent.com/${params.repoAuth}/${params.repoName}/${defaultBranch}/${path}`);
                        }
                        return match;
                    });
                    const htmlContent = await marked(updatedContent);
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
