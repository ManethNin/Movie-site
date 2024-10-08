import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class Login extends Form {

    state = {
        data: { username: '', password: '' },
        errors: {}

    }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }

    doSubmit = () => {
        //Call the serever
        console.log('submitted')
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {/* In HTML, a button inside a form is, by default, considered a submit button unless specified otherwise.*/}

                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password', "password")}
                    {this.renderButton('Login')}
                </form>
            </div>
        )
    }
}

export default Login;