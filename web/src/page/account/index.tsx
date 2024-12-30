import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDialog} from "@/components/layout/use-dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Avatar, AvatarFallback, AvatarImage,} from "@/components/ui/avatar"
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator} from "@/components/ui/breadcrumb";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Separator} from "@/components/ui/separator";
import {CircleUser} from "lucide-react";
import {ReloadIcon} from "@radix-ui/react-icons";
import {Dialog} from "@radix-ui/react-dialog";
import { Helmet } from 'react-helmet-async';
import {useAccountStore} from "@/store/userStore";
import {toast} from "sonner";
import validator from "validator";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const FormSchema = z.object({
    nickname: z
        .string()
        .nonempty(
            { message: "昵称不能为空" }
        ),
    email: z
        .string()
        .optional()
        .refine(
            (value) => !value || validator.isEmail(value),
            { message: "无效的邮箱" }
        ),
});

const repositorySchema = z.object({
    repoAuth: z
        .string()
        .nonempty(
            { message: "仓库名作者不能为空" }
        ),
    repoName: z
        .string()
        .nonempty(
            { message: "仓库名不能为空" }
        ),
});

const Account = () => {
    const { account, getAccount, updateAccount, changeRepository, saving, changing } = useAccountStore();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            nickname: account.nickname,
            email: account.email,
        },
    });

    const changeRepositoryForm = useForm<z.infer<typeof repositorySchema>>({
        resolver: zodResolver(repositorySchema),
        defaultValues: {
            repoAuth: account.repoAuth || '',
            repoName: account.repoName || '',
        }
    })

    const changeRepositoryDialog = useDialog(changeRepositoryForm);

    const handleRepositoryChange = (data: z.infer<typeof repositorySchema>) => {
        const params = {
            repoAuth: data.repoAuth,
            repoName: data.repoName,
        };
        changeRepository(params).then(
            (res) => {
                if (res.code === 1) {
                    getAccount().then(() => {
                        toast.success("保存成功！");
                    });
                    changeRepositoryDialog.dismiss();
                }
                changeRepositoryDialog.dismiss()
            },
        )
    }

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const params = {
            nickname: data.nickname,
            email: data.email || account.email,
        };
        updateAccount(params).then(
            (res) => {
                if (res.code === 1) {
                    toast.success("保存成功！");
                }
            }
        )
    }

    useEffect(() => {
        if(account){
            form.reset({
                nickname: account.nickname,
                email: account.email || '',
            });
        }
    }, []);

    return (
        <div>
            <Helmet>
                <title>账户设置</title>
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
                                账户设置
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <ScrollArea className={'h-[calc(100vh-80px)]'}>
                <div className="container grid gap-2 p-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>账户设置</CardTitle>
                            <CardDescription>
                                仓库互动统计，绑定目标仓库(一个月只能更改一次)
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <ul className="grid gap-3 md:hidden">
                                        <li className="flex items-center justify-between">
                                                                    <span className="text-muted-foreground">
                                                                        用户名
                                                                    </span>
                                            <span>{account.username}</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                                                    <span className="text-muted-foreground">
                                                                        Follower Count
                                                                    </span>
                                            <span>{account.followerCount}</span>
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
                                        <div className='hidden md:block md:w-1/4'>
                                            <Label htmlFor="name">用户名</Label>
                                            <p className='font-semibold'>{account.username}</p>
                                        </div>
                                        <Separator orientation="vertical" className={'hidden md:block'}/>
                                        <div className='hidden md:block  md:w-1/4'>
                                            <Label htmlFor="name">Follower Count</Label>
                                            <p className='font-semibold'>
                                                {account.followerCount}
                                            </p>
                                        </div>
                                        <Separator orientation="vertical" className={'hidden md:block'}/>
                                        <div className='hidden md:block  md:w-1/4'>
                                            <Label htmlFor="name">Star Count</Label>
                                            <p className='font-semibold'>{account.starCount || 0}</p>
                                        </div>
                                        <Separator orientation="vertical" className={'hidden md:block'}/>
                                        <div className='hidden md:block  md:w-1/4'>
                                            <Label htmlFor="name">Fork Count</Label>
                                            <p className='font-semibold'>{account.forkCount || 0}</p>
                                        </div>
                                        <Separator orientation="vertical" className={'hidden md:block'}/>
                                        <div className='hidden md:block  md:w-1/4'>
                                            <Label htmlFor="name">Watch Count</Label>
                                            <p className='font-semibold'>{account.watchCount || 0}</p>
                                        </div>
                                    </div>
                                </div>
                                <Separator/>
                                <div className="grid gap-3">
                                    <Label htmlFor="picture">头像</Label>
                                    <div className='flex items-center gap-4'>
                                    {
                                            account.avatar ?
                                                <Avatar className='w-24 h-24'>
                                                    <AvatarImage src={account.avatar} alt="avatar"/>
                                                    <AvatarFallback>{account.nickname}</AvatarFallback>
                                                </Avatar> :
                                                <CircleUser className="h-16 w-16"/>
                                    }
                                    </div>
                                </div>

                                <div className="grid gap-3">
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                                            <FormField
                                                control={form.control}
                                                name="nickname"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>昵称</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="输入新的昵称" {...field}
                                                                   autoComplete={"off"}
                                                                   className='w-full md:w-2/3'/>
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>邮箱</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="输入邮箱地址" {...field}
                                                                   autoComplete={"off"}
                                                                   className='w-full md:w-2/3'/>
                                                        </FormControl>
                                                        <FormDescription>
                                                            非必填
                                                        </FormDescription>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />
                                            {
                                                saving ?
                                                    <Button disabled>
                                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                                                        正在保存...
                                                    </Button> :
                                                    <Button type="submit">保存</Button>
                                            }
                                        </form>
                                    </Form>
                                    <Label>当前绑定的仓库</Label>
                                    <span>
                                        <a href={`https://github.com/${account.repoAuth}/${account.repoName}`}
                                           target="_blank" rel="noopener noreferrer">
        {account.repoAuth}/{account.repoName}
    </a>
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                        {!(account.repoAuth && account.repoName) && (
                            <CardFooter className="border-t px-6 py-4 grid-col gap-2">
                                <Button variant="destructive" {...changeRepositoryDialog.triggerProps}>修改仓库</Button>
                            </CardFooter>
                        )}
                    </Card>
                </div>
            </ScrollArea>
            <Dialog {...changeRepositoryDialog.dialogProps} >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>修改仓库</DialogTitle>
                        <DialogDescription>
                            一个月之内只能修改一次
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <Form {...changeRepositoryForm}>
                            <form onSubmit={changeRepositoryForm.handleSubmit(handleRepositoryChange)}
                                  className="w-full space-y-6">
                                <FormField
                                    control={changeRepositoryForm.control}
                                    name="repoAuth"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>repoAuth</FormLabel>
                                            <FormControl>
                                                <Input placeholder="输入仓库作者" {...field} autoComplete={"off"}
                                                       className='w-2/3' />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={changeRepositoryForm.control}
                                    name="repoName"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>repoName</FormLabel>
                                            <FormControl>
                                                <Input placeholder="输入仓库名称" {...field} autoComplete={"off"}
                                                       className='w-2/3' />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                {
                                    changing ?
                                        <Button disabled>
                                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
                                            正在修改...
                                        </Button> :
                                        <Button type="submit">确认修改</Button>
                                }
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Account
