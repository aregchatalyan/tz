import React, { Dispatch, FC } from 'react';
import { Pagination } from 'react-bootstrap';
import { calcPages } from '../utils/paginate';

interface PaginateProps {
  current: number;
  total: number;
  setPage: Dispatch<React.SetStateAction<number>>;
}

export const Paginate: FC<PaginateProps> = ({ current, total, setPage }) => {
  const pages = calcPages(current, total);

  return (
    <Pagination>
      <Pagination.First onClick={ () => setPage(1) }/>
      <Pagination.Prev onClick={ () => setPage(prev => prev + -1) } disabled={ current === 1 }/>

      { pages.map((p) => (
        <Pagination.Item key={ p } onClick={ () => setPage(p) } active={ p === current }>
          { p }
        </Pagination.Item>
      )) }

      <Pagination.Ellipsis/>

      <Pagination.Item onClick={ () => setPage(total) } active={ current === total }>
        { total }
      </Pagination.Item>

      <Pagination.Next onClick={ () => setPage(prev => prev + 1) } disabled={ current === total }/>
      <Pagination.Last onClick={ () => setPage(total) }/>
    </Pagination>
  );
}
