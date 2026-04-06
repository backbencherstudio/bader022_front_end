//

"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useI18n } from "@/components/provider/I18nProvider";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const { t, locale } = useI18n();
  const isRTL = locale === "ar";

  const totalPages = Math.ceil(totalItems / pageSize);
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Pagination Logic
  const getPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1, 2, 3, 4, "...", totalPages - 1, totalPages);
    return pages;
  };

  const pages = getPages();

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="flex flex-col md:flex-row items-center justify-between gap-3 w-full"
    >
      {/* TEXT */}
      <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
        {t("Admin.Pagination.showing", {
          start: startItem,
          end: endItem,
          total: totalItems,
        })}
      </p>

      {/* PAGINATION */}
      <Pagination className="w-full sm:w-auto">
        <PaginationContent
          className={`flex items-center gap-1 sm:gap-2 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          {/* PREVIOUS */}
          <PaginationItem>
            <button
              type="button"
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={t("Admin.Pagination.previous")}
            >
              {isRTL ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </button>
          </PaginationItem>

          {/* PAGE NUMBERS */}
          {pages.map((page, index) => (
            <PaginationItem key={index}>
              {page === "..." ? (
                <span className="px-2 text-muted-foreground">...</span>
              ) : (
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => onPageChange(page as number)}
                  className="text-xs sm:text-sm px-2 sm:px-3"
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* NEXT */}
          <PaginationItem>
            <button
              type="button"
              onClick={() =>
                currentPage < totalPages && onPageChange(currentPage + 1)
              }
              disabled={currentPage === totalPages}
              className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={t("Admin.Pagination.next")}
            >
              {isRTL ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
