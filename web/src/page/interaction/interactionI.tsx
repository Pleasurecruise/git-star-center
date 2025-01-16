import React, { useEffect, useState } from 'react';
import {InteractionSearchState, useInteractionSearchStore} from '@/store/interactionSearchStore.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table.tsx";
import Empty from "@/components/layout/empty.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import Pager from '@/page/interaction/pager';
import InteractiveHoverButton from "@/components/magicui/interactive-hover-button.tsx";
import {useErrorStore} from "@/store/errorStore.tsx";
import {useAccountStore} from "@/store/userStore.tsx";
import {useInteractionStore} from "@/store/interactionStore.tsx";
import {useNavigate} from "react-router-dom";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";

interface InteractionMeListProps {
    pageSize: number;
}

const InteractionIList: React.FC<InteractionMeListProps> = ({ pageSize }) => {
    const {
        iInteractionSearch,
        page,
        total,
        isLoading,
        error,
        getIStarSearch,
        getIForkSearch,
        getIWatchSearch,
        getIFollowSearch,
    } = useInteractionSearchStore();

    const [activeTab, setActiveTab] = useState<'stars' | 'forks' | 'watches' | 'follows'>('stars');

    useEffect(() => {
        const fetchData = () => {
            const params = { page, pageSize };
            switch(activeTab){
                case 'stars':
                    getIStarSearch(params);
                    break;
                case 'forks':
                    getIForkSearch(params);
                    break;
                case 'watches':
                    getIWatchSearch(params);
                    break;
                case 'follows':
                    getIFollowSearch(params);
                    break;
                default:
                    break;
            }
        };
        fetchData();
    }, [activeTab, page, pageSize, getIStarSearch, getIForkSearch, getIWatchSearch, getIFollowSearch]);

    useEffect(() => {
        const resetPage = async () => {
            const params = { page: 1, pageSize };
            switch(activeTab){
                case 'stars':
                    await getIStarSearch(params);
                    break;
                case 'forks':
                    await getIForkSearch(params);
                    break;
                case 'watches':
                    await getIWatchSearch(params);
                    break;
                case 'follows':
                    await getIFollowSearch(params);
                    break;
                default:
                    break;
            }
        };
        resetPage();
    }, [activeTab, pageSize, getIStarSearch, getIForkSearch, getIWatchSearch, getIFollowSearch]);

    const handlePageChange = (newPage: number) => {
        const params = { page: newPage, pageSize };
        switch(activeTab){
            case 'stars':
                getIStarSearch(params);
                break;
            case 'forks':
                getIForkSearch(params);
                break;
            case 'watches':
                getIWatchSearch(params);
                break;
            case 'follows':
                getIFollowSearch(params);
                break;
            default:
                break;
        }
    };

    const { setError } = useErrorStore();
    const { getTargetAccount } = useAccountStore();
    const { syncData, getInteraction } = useInteractionStore();
    const { isLoading: interactionLoading } = useInteractionStore();
    const navigate = useNavigate();
    const handleRedirect = (repoAuth:string, repoName:string) => {
        getTargetAccount({ repoAuth, repoName })
            .then(() => syncData({ repoAuth, repoName }))
            .then(() => getInteraction({ repoAuth, repoName }))
            .then(() => { navigate(`/project`); })
            .catch((error) => {
                setError(error);
                console.error("Error during redirection process:", error);
            });
    };

    const renderTable = (data: InteractionSearchState[]) => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Avatar</TableHead>
                    <TableHead>Nickname</TableHead>
                    <TableHead>Repository</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src={`https://github.com/${item.username}.png`} alt="avatar" />
                                <AvatarFallback>{item.username[0]}</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell className="font-semibold">{item.username}</TableCell>
                        <TableCell>{item.repoAuth}/{item.repoName}</TableCell>
                        <TableCell>
                            <InteractiveHoverButton
                                text={"看看他"}
                                onClick={() => handleRedirect(item.repoAuth, item.repoName)} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );

    return (
        <div className='relative min-h-60'>
            {isLoading && (
                <div
                    className="absolute top-0 left-0 right-0 bottom-0 bg-muted/50 bg-opacity-70 flex justify-center items-center z-50">
                    <div
                        className="w-10 h-10 border-4 border-t-4 border-gray-200 border-t-sky-500 rounded-full animate-spin"></div>
                </div>
            )}
            {error && (
                <div className="text-red-500 mb-4">
                    {error}
                </div>
            )}
            <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as 'stars' | 'forks' | 'watches' | 'follows')}>
                <TabsList className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
                    <TabsTrigger value="stars">Stars</TabsTrigger>
                    <TabsTrigger value="forks">Forks</TabsTrigger>
                    <TabsTrigger value="watches">Watches</TabsTrigger>
                    <TabsTrigger value="follows">Follows</TabsTrigger>
                </TabsList>
                <TabsContent value="stars">
                    {iInteractionSearch.length === 0 && !isLoading ? <Empty title={'No Stars'}
                                                                           description={'No star data available'}/> : renderTable(iInteractionSearch)}
                </TabsContent>
                <TabsContent value="forks">
                    {iInteractionSearch.length === 0 && !isLoading ? <Empty title={'No Forks'}
                                                                           description={'No fork data available'}/> : renderTable(iInteractionSearch)}
                </TabsContent>
                <TabsContent value="watches">
                    {iInteractionSearch.length === 0 && !isLoading ? <Empty title={'No Watches'}
                                                                           description={'No watch data available'}/> : renderTable(iInteractionSearch)}
                </TabsContent>
                <TabsContent value="follows">
                    {iInteractionSearch.length === 0 && !isLoading ? <Empty title={'No Follows'}
                                                                           description={'No follow data available'}/> : renderTable(iInteractionSearch)}
                </TabsContent>
            </Tabs>
            <Pager
                page={page}
                pageSize={pageSize}
                rows={iInteractionSearch.length}
                total={total}
                onPageChange={handlePageChange}
            />
            <AlertDialog open={interactionLoading}>
                <AlertDialogContent>
                    <AlertDialogTitle>正在重定向</AlertDialogTitle>
                    <AlertDialogDescription>
                        <div className="flex items-center space-x-2">
                            <span>数据请求中，请耐心等待...</span>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default InteractionIList;
