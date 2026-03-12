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
    const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

    return (
        <div className="flex gap-8 items-center ">

            {/* Previous */}
            <Button className=""
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                &lt;
            </Button>

            {pages.map((page) => (
                <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </Button>
            ))}

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