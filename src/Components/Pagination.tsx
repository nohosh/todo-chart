import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from '../Hooks/usePagination';
import "./styles/pagination.scss";
interface Props {
    onPageChange: (page: number)=>void;
    totalCount: number;    
    currentPage: number;
    pageSize: number;
    className: string;
}
const Pagination = (
    {   
        onPageChange,
        totalCount,    
        currentPage,
        pageSize,
        className
    }:Props) => {
        const siblingCount = 1;
        const paginationRange:any = usePagination({
            currentPage,
            totalCount,
            siblingCount,
            pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            // @ts-ignore
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;

