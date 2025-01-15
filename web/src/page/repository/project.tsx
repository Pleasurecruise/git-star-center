import { useEffect } from "react";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {Helmet} from "react-helmet-async";
import {ScriptCopyBtnDemo} from "@/page/repository/url-copy/url-copy";
import {Label} from "@/components/ui/label.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import NumberTicker from "@/components/ui/number-ticker.tsx";
import TypingAnimation from "@/components/ui/typing-animation.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button.tsx";
import {useAccountStore} from "@/store/userStore";
import {useReadmeStore} from "@/store/readmeStore";
import {useInteractionStore} from "@/store/interactionStore.tsx";
import SubscribeButtons from "@/page/repository/animated-subscribe-buttons.tsx";

const Project = () => {
    const { targetAccount } = useAccountStore();
    const { readmeContent, fetchReadme } = useReadmeStore();
    const { interaction, getInteraction } = useInteractionStore();

    useEffect(() => {
        if (targetAccount.repoAuth && targetAccount.repoName) {
            fetchReadme({ repoAuth: targetAccount.repoAuth, repoName: targetAccount.repoName});
        }
    }, [targetAccount.repoAuth, targetAccount.repoName, fetchReadme, getInteraction]);

    return (
        <div>
            <Helmet>
                <title>仓库</title>
            </Helmet>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <div className="flex flex-1 items-center gap-2 px-3">
                    <SidebarTrigger className="-ml-1"/>
                    <Separator orientation="vertical" className="mr-2 h-4"/>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="/">
                                    首页
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block"/>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/star">
                                    大厅
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block"/>
                            <BreadcrumbItem>
                                <BreadcrumbPage>仓库</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <ScrollArea className={'h-[calc(100vh-80px)]'}>
                <div className="container grid gap-2 p-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <TypingAnimation>
                                    {targetAccount.repoAuth + "/" + targetAccount.repoName}
                                </TypingAnimation>
                            </CardTitle>
                            <CardDescription>
                                <InteractiveHoverButton text={"点击前往"} onClick={() => window.location.href = `https://github.com/${targetAccount.repoAuth}/${targetAccount.repoName}`}/>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <ul className="grid gap-3 md:hidden">
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                                        Follower Count
                                                                    </span>
                                            <span>{targetAccount.followerCount || 0}</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                                        Star Count
                                                                    </span>
                                            <span>{targetAccount.starCount || 0}</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                                        Fork Count
                                                                    </span>
                                            <span>{targetAccount.forkCount || 0}</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                                        Watch Count
                                                                    </span>
                                            <span>{targetAccount.watchCount || 0}</span>
                                        </li>
                                    </ul>
                                    <div className='flex items-center space-x-8 flex-col md:flex-row'>
                                    <Separator orientation="vertical" className={'hidden md:block'}/>
                                        <div className='hidden md:block  md:w-1/4'>
                                            <Label htmlFor="name">Follower Count</Label>
                                            <p className="whitespace-pre-wrap text-6xl font-medium tracking-tighter text-black dark:text-white">
                                                {targetAccount.followerCount ? <NumberTicker value={targetAccount.followerCount}/> : 0}
                                            </p>
                                        </div>
                                        <Separator orientation="vertical" className={'hidden md:block'}/>
                                        <div className='hidden md:block  md:w-1/4'>
                                            <Label htmlFor="name">Star Count</Label>
                                            <p className="whitespace-pre-wrap text-6xl font-medium tracking-tighter text-black dark:text-white">
                                                {targetAccount.starCount ? <NumberTicker value={targetAccount.starCount}/> : 0}
                                            </p>
                                        </div>
                                        <Separator orientation="vertical" className={'hidden md:block'}/>
                                        <div className='hidden md:block  md:w-1/4'>
                                            <Label htmlFor="name">Fork Count</Label>
                                            <p className="whitespace-pre-wrap text-6xl font-medium tracking-tighter text-black dark:text-white">
                                                {targetAccount.forkCount ? <NumberTicker value={targetAccount.forkCount}/> : 0}
                                            </p>
                                        </div>
                                        <Separator orientation="vertical" className={'hidden md:block'}/>
                                        <div className='hidden md:block  md:w-1/4'>
                                            <Label htmlFor="name">Watch Count</Label>
                                            <p className="whitespace-pre-wrap text-6xl font-medium tracking-tighter text-black dark:text-white">
                                                {targetAccount.watchCount ? <NumberTicker value={targetAccount.watchCount}/> : 0}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <Separator/>
                                <div className="grid gap-3">
                                    <div className='flex items-center gap-4'>
                                        <Avatar className='w-24 h-24'>
                                            <AvatarImage src={targetAccount.avatar} alt="avatar"/>
                                            <AvatarFallback>{targetAccount.nickname}</AvatarFallback>
                                        </Avatar>
                                        <div className='flex items-center gap-4 ml-4'>
                                            <ScriptCopyBtnDemo repoAuth={targetAccount.repoAuth}
                                                               repoName={targetAccount.repoName}/>
                                        </div>
                                        <div className='flex items-center gap-4 ml-4'>
                                            {interaction && <SubscribeButtons />}
                                        </div>
                                    </div>
                                </div>
                                <Separator/>
                                <Label htmlFor="readme" className="text-lg">README</Label>
                                <div id="readme-content" className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: readmeContent }} />
                                <Separator/>
                                <Label htmlFor="name" className="text-lg">Star History</Label>
                                <img
                                    src={"https://api.star-history.com/svg?repos=" + targetAccount.repoAuth + "/" + targetAccount.repoName}
                                    alt={"star-history"}
                                    className="shadow-lg border border-gray-200 w-3/5 h-auto mt-2"/>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </ScrollArea>
        </div>
    )
}

export default Project
