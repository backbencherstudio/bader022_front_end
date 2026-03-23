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

    // ✅ NEW PAGINATION LOGIC
    const getPages = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 6) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        // First 4 pages
        pages.push(1, 2, 3, 4);

        // Ellipsis
        pages.push("...");

        // Last 2 pages
        pages.push(totalPages - 1, totalPages);

        return pages;
    };

    const pages = getPages();

    return (
        <div className="flex justify-between w-full">
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

                    {pages.map((page, index) => (
                        <PaginationItem key={index}>
                            {page === "..." ? (
                                <span className="px-2 text-muted-foreground">
                                    ...
                                </span>
                            ) : (
                                <PaginationLink
                                    isActive={page === currentPage}
                                    onClick={() => onPageChange(page as number)}
                                >
                                    {page}
                                </PaginationLink>
                            )}
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