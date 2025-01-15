import { GITHUB_AUTH_URL } from '@/utils/env';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BoxReveal from "@/components/ui/box-reveal";
import DotPattern from "@/components/ui/dot-pattern";
import githubLogo from '@/assets/github.png';
import logoImg from '@/assets/logo.jpg';
import { cn } from "@/lib/utils";

const currentYear = new Date().getFullYear();

function Login() {
    return (
        <div>
            <div className="grid grid-cols-2 gap-4 ml-8">
                {/* 左侧内容 */}
                <div className='flex justify-center items-center h-[calc(100vh_-_theme(spacing.8))]'>
                    <DotPattern
                        width={18}
                        height={18}
                        cx={2}
                        cy={2}
                        cr={1}
                        className={cn(
                            "[mask-image:radial-gradient(900px_circle_at_left,white,transparent)]",
                        )}
                    />
                    <div className="px-4">
                        <BoxReveal boxColor={"#0EA5E9"} duration={0.5}>
                            <p className="text-[3.5rem] font-semibold">
                                <span className="text-yellow-500">让好的项目容易发现，让你的项目不再孤单</span>
                            </p>
                        </BoxReveal>

                        <BoxReveal boxColor={"#0EA5E9"} duration={0.5}>
                            <h2 className="mt-[.5rem] text-xl font-semibold">
                                一个{" "}
                                <span className="text-[#0EA5E9]">个人GitHub项目</span>{" "}互助社区！
                            </h2>
                        </BoxReveal>

                        <BoxReveal boxColor={"#0EA5E9"} duration={0.5}>
                            <div className="mt-6">
                                <p>
                                    -&gt; 互star、互fork、互watch、互follow！
                                    <br/>
                                    -&gt;登录成功后需先绑定项目，遵循一号一库
                                    <br/>
                                    -&gt; 目前仅支持使用 GitHub OAuth 授权登录的方式，因为需要 GitHub 账户授权才能进行操作。
                                    <br/>
                                    -&gt; 如果登录失败，就是 GitHub API 达到了请求次数限制，请稍后再试。
                                    <br/>
                                    -&gt; <a href="https://github.com/Pleasurecruise/Git-Star-Center"
                                             className="text-blue-500 underline">项目地址</a>，你的 Star 是对我最大的支持！
                                </p>
                            </div>
                        </BoxReveal>
                    </div>
                </div>
                {/* 右侧登录卡片 */}
                <div className='flex justify-center items-center h-[calc(100vh_-_theme(spacing.8))]'>
                    <Card className="mx-auto max-w-sm z-10 shadow-2xl">
                        <CardHeader className="text-center w-96 items-center mt-6">
                            <img src={logoImg} alt="logo" className="w-16 mb-2 shadow-2xl"/>
                            <CardTitle
                                className='text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent'>
                                Git Star Center
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <Button
                                    variant="outline"
                                    className="w-full flex items-center justify-center"
                                    onClick={() => window.location.href = GITHUB_AUTH_URL}
                                >
                                    <img src={githubLogo} alt="GitHub" className="inline-block w-6 h-6 mr-2"/>
                                    使用 GitHub 账号登录
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    <DotPattern
                        width={16}
                        height={16}
                        cx={12}
                        cy={12}
                        cr={1}
                        className={cn(
                            "[mask-image:radial-gradient(900px_circle_at_right,white,transparent)]",
                        )}
                    />
                </div>
            </div>
            <footer className={'text-center text-muted-foreground text-xs'}>
                <p>&copy; {currentYear} Git Star Center. All rights reserved. 浙ICP备2023040885号-3. 前端风格参考 <a
                    href="https://github.com/pipijoe/xryder-web" className="text-blue-500 underline">X.Ryder</a>。</p>
            </footer>
        </div>
    );
}

export default Login;
