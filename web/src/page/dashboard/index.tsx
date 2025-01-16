import { SidebarTrigger } from "@/components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { NavActions } from "@/components/layout/nav-actions.tsx";
import { Welcome } from "@/page/dashboard/welcome/Welcome.tsx";
import { useTheme } from "@/components/layout/theme-provider";
import {BentoDemo} from "@/page/dashboard/welcome/BentoGrid.tsx";
const Dashboard = () => {
    useTheme();
    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
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
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="ml-auto px-3">
                    <NavActions/>
                </div>
            </header>

            <div className="flex flex-1 flex-col gap-4 p-4 overflow-auto">
                <Welcome/>
                <BentoDemo/>
            </div>
        </div>
    )
}

export default Dashboard;
