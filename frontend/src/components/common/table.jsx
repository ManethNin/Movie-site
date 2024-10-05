import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';


const Table = ({ columns, data, onSort, sortColumn }) => { //we can use like this passing arguments instead of props
    return (
        <table className='table' >
            <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />

            < TableBody data={data} columns={columns} />


            {/* we can use 'this.handleClicke' only when we don't have para to pass. but in here we have to pass para so we need to de arrow func */}
            {/* but if use  'this.handleClicke(item._id)' only without arrow func, 'handleClicke(itemId)' automatcally get called and delete all the movies */}

        </table>
    );

}

export default Table;