import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Generates an array of page numbers to display in pagination
 * Shows first, last, current, and adjacent pages with ellipsis for gaps
 */
const generatePageNumbers = (currentPage: number, totalPages: number): (number | "ellipsis")[] => {
  if (totalPages <= 7) {
    // Show all pages if total is 7 or less
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [];
  
  // Always show first page
  pages.push(1);

  if (currentPage <= 3) {
    // Near the beginning: 1 2 3 4 5 ... 10
    pages.push(2, 3, 4, 5);
    pages.push("ellipsis");
    pages.push(totalPages);
  } else if (currentPage >= totalPages - 2) {
    // Near the end: 1 ... 6 7 8 9 10
    pages.push("ellipsis");
    for (let i = totalPages - 4; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // In the middle: 1 ... 4 5 6 7 8 ... 10
    pages.push("ellipsis");
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      pages.push(i);
    }
    pages.push("ellipsis");
    pages.push(totalPages);
  }

  return pages;
};

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPrevPage,
}) => {
  // Don't render pagination if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasPrevPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasNextPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            href="#" 
            onClick={handlePrevious}
            className={!hasPrevPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
            size={undefined}
          />
        </PaginationItem>

        {pageNumbers.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={handlePageClick(page)}
                isActive={page === currentPage}
                className="cursor-pointer"
                size={undefined}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext 
            href="#" 
            onClick={handleNext}
            className={!hasNextPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
            size={undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
