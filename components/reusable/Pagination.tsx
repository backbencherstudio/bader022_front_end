"use client";

import { Button } from "@/components/ui/button";

type PaginationProps = {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({
    currentPage,
    lastPage,
    onPageChange,
}: PaginationProps) {

    // ✅ NEW LOGIC
    const getPages = () => {
        const pages: (number | string)[] = [];

        if (lastPage <= 6) {
            return Array.from({ length: lastPage }, (_, i) => i + 1);
        }

        // First 4
        pages.push(1,);

        // Ellipsis
        pages.push("...");

        // Last 2
        pages.push(lastPage - 1, lastPage);

        return pages;
    };

    const pages = getPages();

    return (
        <div className="flex gap-2 items-center">

            {/* Previous */}
            <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                &lt;
            </Button>

            {pages.map((page, index) =>
                page === "..." ? (
                    <span key={index} className="px-2 text-gray-500">
                        ...
                    </span>
                ) : (
                    <Button
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        onClick={() => onPageChange(page as number)}
                    >
                        {page}
                    </Button>
                )
            )}

            {/* Next */}
            <Button
                variant="outline"
                disabled={currentPage === lastPage}
                onClick={() => onPageChange(currentPage + 1)}
            >
                &gt;
            </Button>

        </div>
    );
}