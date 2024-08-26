import React, { Component } from 'react';
import Input from './input';

class Search extends Component {


    render() {

        const { onChange, value } = this.props
        return (
            <input value={value} type="text" className='form-control my-3' placeholder="Search..." name="query" onChange={e => (onChange(e.currentTarget.value))} />
        );
    }
}

export default Search;