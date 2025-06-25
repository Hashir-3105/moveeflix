import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const CustomPagination = ({ currentPage, onPageChange, totalPages }) => {
  return (
    <Pagination className={"my-3.5"}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1)
                onPageChange((prev) => Math.max(1, prev - 1));
            }}
            className={`${
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            } cursor-pointer`}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === page}
              onClick={() => onPageChange(page)}
              className={`${currentPage === page ? "bg-gray-500" : ""}`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            // disabled={currentPage === totalPages || totalPages === 0}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) {
                onPageChange((prev) => Math.min(totalPages, prev + 1));
              }
            }}
            className={`${
              currentPage === totalPages || totalPages === 0
                ? "pointer-events-none opacity-50"
                : ""
            } cursor-pointer`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
