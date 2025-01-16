import { SidebarTrigger } from "@/components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { NavActions } from "@/components/layout/nav-actions.tsx";
import { useTheme } from "@/components/layout/theme-provider";
import {VelocityScroll} from "@/components/magicui/scroll-based-velocity.tsx";

const Announcement = () => {
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
                            <BreadcrumbSeparator className="hidden md:block"/>
                            <BreadcrumbItem>
                                <BreadcrumbPage>社区公告</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="ml-auto px-3">
                    <NavActions/>
                </div>
            </header>

            <div className="flex flex-1 flex-col gap-4 p-4 overflow-auto">
                <VelocityScroll>社区公告</VelocityScroll>
                <div className="text-lg">
                    <p>① 本项目使用Github OAuth2进行授权认证，不会保存用户的密码等敏感信息</p>
                    <br/>
                    <p>② 由于Github
                        API请求速率的限制，，为了避免操作失败，所以对互动操作的频率进行了限制(每小时只允许操作5次)，请详细浏览了仓库再进行操作。</p>
                    <br/>
                    <p>同时，由于需要从Github同步数据等原因，在加载项目详情页时可能需要花费时间。</p>
                    <br/>
                    <p>③ 社区实行一个Github账户对应一个仓库，一旦绑定无法更改</p>
                    <br/>
                    <p>因为账户绑定的仓库更改后，需要更改仓库的基础数据以及和你互动过的用户数据(比如是否star)，这在没有授权的情况下是无法完成的</p>
                    <br/>
                    <p><strong>所以请谨慎选择需要绑定的仓库！！</strong></p>
                    <br/>
                    <p>④ 类似的网站还有<a href="https://gitstar.com.cn/" target="_blank" rel="noopener noreferrer"
                                          className="text-blue-600 underline">Github互赞吧</a> 以及 <a
                        href="https://www.gitstarhub.com/" target="_blank" rel="noopener noreferrer"
                        className="text-blue-600 underline">GitStarHub</a></p>
                </div>
            </div>
        </div>
    )
}

export default Announcement;
