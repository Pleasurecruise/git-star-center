import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import InteractionMeList from "@/page/interaction/interactionMe.tsx";
import { SidebarTrigger } from "@/components/ui/sidebar.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const ToMe = () => {
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        const handleResize = () => {
            const h = window.innerHeight;
            const calculatedPageSize = Math.floor((h - 360) / 60 - 1);
            setPageSize(calculatedPageSize);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <Helmet>
                <title>角色管理</title>
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
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink>
                                    互动中心
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block"/>
                            <BreadcrumbItem>
                                <BreadcrumbPage>我的收获</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className={'pl-4 pt-2 pr-4 container grid gap-2'}>
                <Card>
                    <CardHeader>
                        <CardTitle>我的收获</CardTitle>
                        <CardDescription>
                            我绑定的仓库收获的互动
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <InteractionMeList pageSize={pageSize} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ToMe;
