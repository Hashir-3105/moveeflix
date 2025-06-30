import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/Components/ui/pagination";
import { getPaginationRange } from "@/lib/utils";

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
        {getPaginationRange(currentPage, totalPages).map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <span className="px-2">...</span>
            ) : (
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => onPageChange(page)}
                className={`${currentPage === page ? "bg-gray-500" : ""}`}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
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
