import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SidebarTrigger } from "@/components/ui/sidebar.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";
import Marquee from "@/components/ui/marquee";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import BlurFade from "@/components/ui/blur-fade.tsx";
import { useAccountStore } from "@/store/userStore.tsx";
import { useRepositoryStore } from "@/store/repositoryStore.tsx";
import { useInteractionStore } from "@/store/interactionStore.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Star as StarIcon, GitFork, Eye, UserPlus } from 'lucide-react';

const RepoStats = ({ starCount, forkCount, watchCount, followerCount }: { starCount: number, forkCount: number, watchCount: number, followerCount: number }) => (
    <div className="flex justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-1">
            <StarIcon className="w-4 h-4" />
            <span>{starCount}</span>
        </div>
        <div className="flex items-center space-x-1">
            <GitFork className="w-4 h-4" />
            <span>{forkCount}</span>
        </div>
        <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{watchCount}</span>
        </div>
        <div className="flex items-center space-x-1">
            <UserPlus className="w-4 h-4" />
            <span>{followerCount}</span>
        </div>
    </div>
);

const StarComponent = () => {
    const { getTargetAccount } = useAccountStore();
    const { repository, getRepository, page, totalPages } = useRepositoryStore();
    const { getInteraction } = useInteractionStore();
    const navigate = useNavigate();

    const handleRedirect = (repoAuth:string, repoName:string) => {
        getTargetAccount({ repoAuth, repoName }).then(() => {
            getInteraction({ repoAuth, repoName }).then(() => {
                navigate(`/project`);
            });
        });
    };

    useEffect(() => {
        if (repository.length === 0) {
            getRepository({ page: 1 });
        }
    }, [getRepository, repository.length]);

    const firstRow = repository.slice(0, 3);
    const secondRow = repository.slice(3, 6);
    const thirdRow = repository.slice(6);

    return (
        <div>
            <Helmet>
                <title>大厅</title>
            </Helmet>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <div className="flex flex-1 items-center gap-2 px-3">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="/">首页</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>大厅</BreadcrumbPage>
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
                                <BlurFade delay={0.25} inView>
                                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Help Each Other! 😎
                                    </h2>
                                </BlurFade>
                            </CardTitle>
                            <CardDescription>
                                <Button
                                    size="sm"
                                    className="h-7 gap-1"
                                    onClick={() => {
                                        getRepository({ page: page < totalPages ? page + 1 : 1 });
                                    }}
                                >
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">换一批</span>
                                </Button>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
                                <Marquee pauseOnHover className="[--duration:60s]">
                                    {firstRow.map((repo) => (
                                        <div
                                            key={repo.id}
                                            className="relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4"
                                            onClick={() => handleRedirect(repo.repoAuth, repo.repoName)}
                                        >
                                            <div className="flex flex-row items-center gap-2">
                                                <Avatar className="w-10 h-10">
                                                    <AvatarImage src={`https://github.com/${repo.username}.png`} alt="avatar" />
                                                    <AvatarFallback>{repo.username[0]}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <figcaption className="text-sm font-medium dark:text-white">
                                                        {repo.repoAuth}/{repo.repoName}
                                                    </figcaption>
                                                    <p className="text-xs font-medium dark:text-white/40">{repo.language}</p>
                                                </div>
                                            </div>
                                            <blockquote className="mt-2 text-sm">{repo.repoBio}</blockquote>
                                            <RepoStats
                                                starCount={repo.starCount}
                                                forkCount={repo.forkCount}
                                                watchCount={repo.watchCount}
                                                followerCount={repo.followerCount}
                                            />
                                        </div>
                                    ))}
                                </Marquee>
                                <Marquee reverse pauseOnHover className="[--duration:60s]">
                                    {secondRow.map((repo) => (
                                        <div
                                            key={repo.id}
                                            className="relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4"
                                            onClick={() => handleRedirect(repo.repoAuth, repo.repoName)}
                                        >
                                            <div className="flex flex-row items-center gap-2">
                                                <Avatar className="w-10 h-10">
                                                    <AvatarImage src={`https://github.com/${repo.username}.png`} alt="avatar" />
                                                    <AvatarFallback>{repo.username[0]}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <figcaption className="text-sm font-medium dark:text-white">
                                                        {repo.repoAuth}/{repo.repoName}
                                                    </figcaption>
                                                    <p className="text-xs font-medium dark:text-white/40">{repo.language}</p>
                                                </div>
                                            </div>
                                            <blockquote className="mt-2 text-sm">{repo.repoBio}</blockquote>
                                            <RepoStats
                                                starCount={repo.starCount}
                                                forkCount={repo.forkCount}
                                                watchCount={repo.watchCount}
                                                followerCount={repo.followerCount}
                                            />
                                        </div>
                                    ))}
                                </Marquee>
                                <Marquee pauseOnHover className="[--duration:60s]">
                                    {thirdRow.map((repo) => (
                                        <div
                                            key={repo.id}
                                            className="relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4"
                                            onClick={() => handleRedirect(repo.repoAuth, repo.repoName)}
                                        >
                                            <div className="flex flex-row items-center gap-2">
                                                <Avatar className="w-10 h-10">
                                                    <AvatarImage src={`https://github.com/${repo.username}.png`} alt="avatar" />
                                                    <AvatarFallback>{repo.username[0]}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <figcaption className="text-sm font-medium dark:text-white">
                                                        {repo.repoAuth}/{repo.repoName}
                                                    </figcaption>
                                                    <p className="text-xs font-medium dark:text-white/40">{repo.language}</p>
                                                </div>
                                            </div>
                                            <blockquote className="mt-2 text-sm">{repo.repoBio}</blockquote>
                                            <RepoStats
                                                starCount={repo.starCount}
                                                forkCount={repo.forkCount}
                                                watchCount={repo.watchCount}
                                                followerCount={repo.followerCount}
                                            />
                                        </div>
                                    ))}
                                </Marquee>
                                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
                                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
                                <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white dark:from-background"></div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </ScrollArea>
        </div>
    );
};

export default StarComponent; // 或者使用您选择的新名称
