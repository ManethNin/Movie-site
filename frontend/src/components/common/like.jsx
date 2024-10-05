import React, { Component } from 'react';

const Like = (props) => {
    let classes = "fa fa-heart";
    if (props.Like === false) {
        classes += '-o'
    }
    return (

        //return statement expects an expression. not statements
        <i className={classes} aria-hidden='true' onClick={props.onClick} style={{cursor:'pointer'}}></i>

    );
}

export default Like;