"use client"

import * as React from "react"
import {useEffect} from "react"
import {Home, Mail, Monitor, SquareTerminal,} from "lucide-react"
import {v4 as uuidv4} from 'uuid';
import {NavMain} from "@/components/layout/nav-main.tsx"
import {NavSecondary} from "@/components/layout/nav-secondary.tsx";
import {NavSystem} from "@/components/layout/nav-system.tsx"
import {NavUser} from "@/components/layout/nav-user.tsx"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar.tsx"
import {useAuthStore} from "@/store/tokenStore.tsx";
import {useAccountStore} from "@/store/userStore.tsx";
import {useVisitorStore} from "@/store/visitorStore.tsx";
import logoImg from '@/assets/logo.jpg';

const data = {
    navMain: [
        {
            title: "Git Star Center",
            url: "#",
            icon: Home,
            isActive: true,
            items: [
                {
                    title: "首页",
                    url: "/",
                },
                {
                    title: "社区公告",
                    url: "/announcement",
                },
                {
                    title: "我的仓库",
                    url: "/repository",
                },
            ],
        },
        {
            title: "互动中心",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "互动大厅",
                    url: "/star",
                },
                {
                    title: "我的收获",
                    url: "/me",
                },
                {
                    title: "我的操作",
                    url: "/my",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "收件箱",
            url: "/mail",
            icon: Mail,
        }
    ],
    projects: [
        {
            name: "监控",
            url: "/monitor",
            icon: Monitor,
        },
    ],
}

function getOrCreateUUID() {
    let userUUID = localStorage.getItem('userUUID');
    if (!userUUID) {
        userUUID = uuidv4();
        localStorage.setItem('userUUID', userUUID);
    }
    return userUUID;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { account, getAccount } = useAccountStore();
    const { logout } = useAuthStore();
    const { visit } = useVisitorStore();
    useEffect(() => {
        const userUUID = getOrCreateUUID();
        visit({ userUUID });
        getAccount();
    }, []);
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="https://github.com/CompPsyUnion/NottinghamWall">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <img src={logoImg}></img>
                                </div>
                                <div className="flex flex-row gap-0.5 leading-none">
                                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">Git Star Center</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className={'custom-scrollbar'}>
                <NavMain items={data.navMain} />
                <NavSystem projects={data.projects} />
                <NavSecondary account={account} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={account} logout={logout}/>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
