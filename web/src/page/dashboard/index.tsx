// src/pages/dashboard/Dashboard.tsx
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList
} from "@/components/ui/breadcrumb";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NavActions } from "@/components/layout/nav-actions.tsx";
import { Welcome } from "@/page/dashboard/welcome/Welcome.tsx";
import { MagicCard } from "@/components/ui/magic-card";
import Autoplay from "embla-carousel-autoplay";
import { useTheme } from "@/components/layout/theme-provider";

const imageData = [
    {
        src: 'https://github.com/user-attachments/assets/26226271-e5d5-41cd-86db-7693ec98581a',
        alt: '图片1描述',
        description: '这是图片1的描述。'
    },
    {
        src: 'https://github.com/user-attachments/assets/0603ce25-48a6-4672-92a8-5a7a51f0c320',
        alt: '图片2描述',
        description: '这是图片2的描述。'
    },
    {
        src: 'https://github.com/user-attachments/assets/5e093f4a-4490-43b6-89ad-54dd0eab8289',
        alt: '图片3描述',
        description: '这是图片3的描述。'
    },
    {
        src: 'https://github.com/user-attachments/assets/13446b39-4e5f-4cb8-8718-7dbf7fadd7e3',
        alt: '图片4描述',
        description: '这是图片4的描述。'
    },
];

const Dashboard = () => {
    const { theme } = useTheme();
    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <div className="flex flex-1 items-center gap-2 px-3">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
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
                    <NavActions />
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 flex-row gap-4 p-4 overflow-auto">
                {/* 左侧 Carousel */}
                <div className="flex-1 flex flex-col items-center">
                    <Welcome />
                    <Carousel
                        className="w-full h-full max-w-md sm:max-w-lg lg:max-w-xl"
                        plugins={[Autoplay({ delay: 2000 })]}
                    >
                        <CarouselContent>
                            {imageData.map((image, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-2 h-full flex flex-col">
                                        <Card className="shadow-lg h-full flex flex-col">
                                            <CardContent className="flex-1 flex items-center justify-center p-0">
                                                <img
                                                    src={image.src}
                                                    alt={image.alt}
                                                    className="w-full h-full object-cover rounded-xl"
                                                />
                                            </CardContent>
                                            {/* 图片描述 */}
                                            <div className="p-2 text-center text-sm text-gray-600">
                                                {image.description}
                                            </div>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>

                <div className="flex-1 flex items-center justify-center">
                    <MagicCard
                        className="w-full h-full max-w-md sm:max-w-lg lg:max-w-xl p-4 flex flex-col shadow-2xl rounded-xl overflow-auto"
                        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
                    >
                        <div className="text-left space-y-4">
                            <h1 className="text-2xl font-bold">社区公告！</h1>
                            <p>① 本项目使用Github OAuth2进行授权认证，不会保存用户的密码等敏感信息</p>
                            <p>② 由于Github
                                API请求速率的限制，为了避免操作失败，所以对互动操作的频率进行了限制(每小时只允许操作5次)</p>
                            <p>请详细浏览了仓库再进行操作</p>
                            <p>③ 同时，社区实行一个Github账户对应一个仓库，一旦绑定无法更改</p>
                            <p>因为账户绑定的仓库更改后，需要更改仓库的基础数据以及和你互动过的用户数据(比如是否star)，这在没有授权的情况下是无法完成的</p>
                            <p><strong>所以请谨慎选择需要绑定的仓库！！</strong></p>
                            <p>④ 类似的网站还有<a href="https://gitstar.com.cn/" target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="text-blue-600 underline">Github互赞吧</a> 以及 <a
                                href="https://www.gitstarhub.com/" target="_blank" rel="noopener noreferrer"
                                className="text-blue-600 underline">GitStarHub</a></p>
                        </div>
                    </MagicCard>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
