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
import {useAccountStore} from "@/store/userStore";
import {useReadmeStore} from "@/store/readmeStore.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {CircleUser} from "lucide-react";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button.tsx";

const Repository = () => {
    const { account } = useAccountStore();
    const { readmeContent, readmeError, fetchReadme } = useReadmeStore();

    useEffect(() => {
        fetchReadme({ repoAuth:account.repoAuth, repoName:account.repoName});
    }, [account.repoAuth, account.repoName, fetchReadme]);

    return (
        <div>
            <Helmet>
                <title>我的仓库</title>
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
                                <BreadcrumbPage>我的仓库</BreadcrumbPage>
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
                                    {account.repoAuth + "/" + account.repoName}
                                </TypingAnimation>
                            </CardTitle>
                            <CardDescription>
                                <InteractiveHoverButton text={"点击前往"} onClick={() => window.location.href = `https://github.com/${account.repoAuth}/${account.repoName}`}/>
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
                                            <span>{account.followerCount || 0}</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                                        Star Count
                                                                    </span>
                                            <span>{account.starCount || 0}</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                                        Fork Count
                                                                    </span>
                                            <span>{account.forkCount || 0}</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">
                                                                        Watch Count
                                                                    </span>
                                            <span>{account.watchCount || 0}</span>
                                        </li>
                                    </ul>
                                    <div className='flex items-center space-x-8 flex-col md:flex-row'>
                                        <Separator orientation="vertical" className={'hidden md:block'}/>
                                        <div className='hidden md:block  md:w-1/4'>
                                            <Label htmlFor="name">Follower Count</Label>
                                            <p className="whitespace-pre-wrap text-6xl font-medium tracking-tighter text-black dark:text-white">
                                                <NumberTicker value={account.followerCount || 0}/>
                                            </p>
                                        </div>
                                        <Separator orientation="vertical" className={'hidden md:block'}/>
                                        <div className='hidden md:block  md:w-1/4'>
                                            <Label htmlFor="name">Star Count</Label>
                                            <p className="whitespace-pre-wrap text-6xl font-medium tracking-tighter text-black dark:text-white">
                                                <NumberTicker value={account.starCount || 0}/>
                                            </p>
                                        </div>
                                        <Separator orientation="vertical" className={'hidden md:block'}/>
                                        <div className='hidden md:block  md:w-1/4'>
                                            <Label htmlFor="name">Fork Count</Label>
                                            <p className="whitespace-pre-wrap text-6xl font-medium tracking-tighter text-black dark:text-white">
                                                <NumberTicker value={account.forkCount || 0}/>
                                            </p>
                                        </div>
                                        <Separator orientation="vertical" className={'hidden md:block'}/>
                                        <div className='hidden md:block  md:w-1/4'>
                                            <Label htmlFor="name">Watch Count</Label>
                                            <p className="whitespace-pre-wrap text-6xl font-medium tracking-tighter text-black dark:text-white">
                                                <NumberTicker value={account.watchCount || 0}/>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <Separator/>
                                <div className="grid gap-3">
                                    <div className='flex items-center gap-4'>
                                        {
                                            account.avatar ?
                                                <Avatar className='w-24 h-24'>
                                                    <AvatarImage src={account.avatar} alt="avatar"/>
                                                    <AvatarFallback>{account.nickname}</AvatarFallback>
                                                </Avatar> :
                                                <CircleUser className="h-16 w-16"/>
                                        }
                                        <div className='flex items-center gap-4 ml-4'>
                                                    <ScriptCopyBtnDemo repoName={account.repoName} repoAuth={account.repoAuth}/>
                                                </div>
                                    </div>
                                </div>
                                <Separator/>
                                {account.repoAuth && account.repoName && !readmeError && (
                                    <>
                                        <Label htmlFor="readme" className="text-lg">README</Label>
                                        <div id="readme-content" className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: readmeContent }} />
                                        <Separator/>
                                    </>
                                )}
                                {account.repoAuth && account.repoName && readmeError && (
                                    <>
                                        <Label htmlFor="name" className="text-lg">Star History</Label>
                                        <img
                                            src={"https://api.star-history.com/svg?repos=" + account.repoAuth + "/" + account.repoName}
                                            alt={"star-history"}
                                            className="shadow-lg border border-gray-200 w-3/5 h-auto mt-2"/>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </ScrollArea>
        </div>
    )
}

export default Repository
