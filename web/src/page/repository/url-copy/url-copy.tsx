import ScriptCopyBtn from "@/components/magicui/script-copy-btn.tsx";

export function ScriptCopyBtnDemo({ repoAuth, repoName }: { repoAuth: string; repoName: string }) {
    const customCommandMap = {
        github: "https://github.com/" + repoAuth + "/" + repoName,
    };
    return (
        <ScriptCopyBtn
            showMultiplePackageOptions={true}
            codeLanguage="shell"
            lightTheme="nord"
            darkTheme="vitesse-dark"
            commandMap={customCommandMap}
        />

    );
}
