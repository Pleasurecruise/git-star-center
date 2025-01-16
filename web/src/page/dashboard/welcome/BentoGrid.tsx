import { FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import { AnimatedBeamMultipleOutputDemo } from "@/page/dashboard/welcome/AnimatedMeamOutput.tsx";
import { AnimatedListDemo } from "@/page/dashboard/welcome/AnimatedList.tsx";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid.tsx";
import { Calendar } from "@/components/ui/calendar";
import Marquee from "@/components/ui/marquee";

const files = [
    {
        name: "Git Star Center",
        body: "个人GitHub项目互助社区！互star、互fork、互watch、互follow！让好的项目容易发现，让你的项目不再孤单",
    },
    {
        name: "NottinghamWall",
        body: "校园墙uniapp",
    },
    {
        name: "Boss-Key",
        body: "老板来了？快用Boss-Key一键隐藏静音当前窗口！上班摸鱼必备神器",
    },
];

const features = [
    {
        Icon: FileTextIcon,
        name: "公告",
        description: "开始前你需要注意的事项",
        href: "/announcement",
        cta: "查看公告",
        className: "col-span-3 lg:col-span-1",
        background: (
            <Calendar
                mode="single"
                selected={new Date(2022, 4, 11, 0, 0, 0)}
                className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
            />
        )
    },
    {
        Icon: Share2Icon,
        name: "互动大厅",
        description: "为他人的项目提供认可",
        href: "/star",
        cta: "前往互动",
        className: "col-span-3 lg:col-span-2",
        background: (
            <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
        ),
    },
    {
        Icon: FileTextIcon,
        name: "置顶推荐",
        description: "如果你也想被推荐",
        href: "/announcement",
        cta: "了解详情",
        className: "col-span-3 lg:col-span-2",
        background: (
            <Marquee
                pauseOnHover
                className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
            >
                {files.map((f, idx) => (
                    <figure
                        key={idx}
                        className={cn(
                            "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
                            "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                            "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                            "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
                        )}
                    >
                        <div className="flex flex-row items-center gap-2">
                            <div className="flex flex-col">
                                <figcaption className="text-sm font-medium dark:text-white ">
                                    {f.name}
                                </figcaption>
                            </div>
                        </div>
                        <blockquote className="mt-2 text-xs">{f.body}</blockquote>
                    </figure>
                ))}
            </Marquee>
        )
    },
    {
        Icon: BellIcon,
        name: "收件箱",
        description: "获取最新的互动信息",
        href: "/mail",
        cta: "点击跳转",
        className: "col-span-3 lg:col-span-1",
        background: (
            <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
        ),
    },
];

export function BentoDemo() {
    return (
        <BentoGrid>
            {features.map((feature, idx) => (
                <BentoCard key={idx} {...feature} />
            ))}
        </BentoGrid>
    );
}
