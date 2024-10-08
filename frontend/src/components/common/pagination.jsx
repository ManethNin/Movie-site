import React, { Component } from 'react';
import Proptypes from 'prop-types'
import _ from 'lodash'

const Pagination = (props) => {

    const { itemCount, pageSize, onPageChange, currentPage } = props;
    const pagesCount = Math.ceil(itemCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1)
    return (

        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pages.map(page => (
                    <li className={page === currentPage ? "page-item active" : 'page-item'}
                        key={page}>
                        <a className="page-link"
                            onClick={() => onPageChange(page)}>{page}</a></li>
                )

                )}

            </ul>
        </nav>
    );
}

Pagination.propType = {
    itemCount: Proptypes.number.isRequired,
    pageSize: Proptypes.number.isRequired,
    onPageChange: Proptypes.number.isRequired,
    currentPage: Proptypes.number.isRequired
}

export default Pagination;