import React from 'react';
import _ from 'lodash';

import Button from '@mui/material/Button';


type PaginationProps = {
    itemsLength: number;
    pageSize: number
    currentPage: number
    changePage: (page: number) => void
}

export const Pagination = (props: PaginationProps) => {
    const pageCount = Math.ceil(props.itemsLength / props.pageSize);

    if (pageCount === 1) return null;

    const pages: Array<number> = _.range(1, pageCount + 1);

    return (
        <nav>
            <ul className="pagination">
                {pages.map((page) =>
                    <li key={'page_' + page}>
                        <Button
                            color={page === props.currentPage ? 'secondary' : 'primary'}
                            variant={page === props.currentPage ? 'contained' : 'outlined'}
                            onClick={() => props.changePage(page)}>
                            {page}
                        </Button>
                    </li>
                )}
            </ul>
        </nav>
    );
};