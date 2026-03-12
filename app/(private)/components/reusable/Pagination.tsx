"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface DataPaginationProps {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

export function DataPagination({
    totalItems,
    currentPage,
    pageSize,
    onPageChange,
}: DataPaginationProps) {
    const totalPages = Math.ceil(totalItems / pageSize);

    if (totalPages <= 1) return null;

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex  justify-between w-full">
            <p className="text-sm text-muted-foreground">
                Showing {startItem}-{endItem} of {totalItems} Results
            </p>

            <Pagination className="w-full flex justify-end">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() =>
                                currentPage > 1 && onPageChange(currentPage - 1)
                            }
                        />
                    </PaginationItem>

                    {pages.map((pageNumber) => (
                        <PaginationItem key={pageNumber}>
                            <PaginationLink
                                isActive={pageNumber === currentPage}
                                onClick={() => onPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() =>
                                currentPage < totalPages &&
                                onPageChange(currentPage + 1)
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}