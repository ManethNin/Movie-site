import React, { Component } from 'react';
import _ from 'lodash'
import { Link } from 'react-router-dom';

class TableBody extends Component {
    renderCell = (item, column) => {
        if (column.content) return column.content(item)

        // if (column.path === 'title')
        //     return (
        //         <Link to ={`/movies/${item._id}`}>{item.title} </Link>

        //         )
        else return _.get(item, column.path)
    }

    handleKey = (item, column) => {
        return item._id + (column.path || column.key)
    }

    render() {

        const { data, columns } = this.props
        return (
            <tbody>
                {data.map(item => (
                    <tr key={item._id}>
                        {columns.map(column => (<td key={this.handleKey(item, column)}>{this.renderCell(item, column)}</td>))}


                    </tr>)
                )}
            </tbody>

        );
    }
}

export default TableBody;