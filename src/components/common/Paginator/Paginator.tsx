import React, { memo, useState } from "react";

import cn from "classnames";

import styles from "./Paginator.module.css";

type PaginatorPropsType = {
  totalItemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (page: number) => void;
  portionSize: number;
};

export const Paginator: React.FC<PaginatorPropsType> = memo(
  ({ onPageChanged, pageSize, currentPage, portionSize, totalItemsCount }) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize);
    const pages: number[] = [];

    for (let i = 1; i < pagesCount; i++) {
      pages.push(i);
    }

    const portionCount = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;

    return (
      <div className={styles.paginator}>
        {portionNumber > 1 && (
          <button
            onClick={() => {
              setPortionNumber(portionNumber - 1);
            }}>
            PREV
          </button>
        )}
        {pages
          .filter((page) => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
          .map((page) => {
            return (
              <span
                className={cn(
                  {
                    [styles.selectedPage]: currentPage === page,
                  },
                  styles.pageNumber,
                )}
                key={page}
                onClick={(e) => onPageChanged(page)}>
                {page}
              </span>
            );
          })}
        {portionCount > portionNumber && <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>}
      </div>
    );
  },
);
