import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

interface PagerProps {
    page: number;
    pageSize: number;
    rows: number;
    total: number;
    onPageChange: (page: number) => void;
}

const Pager: React.FC<PagerProps> = ({ page, pageSize, rows, total, onPageChange }) => {
    const totalPages = Math.ceil(total / pageSize);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    const renderPaginationItems = () => {
        const items = [];

        if (page > 3) {
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink
                        onClick={() => handlePageChange(1)}
                        isActive={page === 1}
                        className='cursor-pointer'
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            );

            if (page > 4) {
                items.push(
                    <PaginationItem key="start-ellipsis">
                        <PaginationEllipsis/>
                    </PaginationItem>
                );
            }
        }

        for (let i = Math.max(1, page - 2); i <= Math.min(totalPages, page + 2); i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        onClick={() => handlePageChange(i)}
                        isActive={page === i}
                        className='cursor-pointer'
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        if (page < totalPages - 3) {
            items.push(
                <PaginationItem key="end-ellipsis">
                    <PaginationEllipsis/>
                </PaginationItem>
            );
        }

        if (page < totalPages - 2) {
            items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink
                        onClick={() => handlePageChange(totalPages)}
                        isActive={page === totalPages}
                        className='cursor-pointer'
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };

    return (
        <div className='flex justify-between w-full mt-4'>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => handlePageChange(page - 1)} className='cursor-pointer'/>
                    </PaginationItem>
                    {renderPaginationItems()}
                    <PaginationItem>
                        <PaginationNext onClick={() => handlePageChange(page + 1)} className='cursor-pointer'/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            <div className="text-xs text-muted-foreground w-64">
                显示 <strong>第{page}页</strong> - <strong>{rows}条记录</strong>
            </div>
        </div>
    );
};

export default Pager;
