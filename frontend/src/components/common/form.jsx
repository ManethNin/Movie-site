import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
// import Select from "./src/components/common/select";
import Select from 'react-select'


class Form extends Component {
    state = {
        data: {},
        errors: {}
    }

    validate = () => {

        const options = { abortEarly: false }
        console.log(this.state.data, this.schema, options)
        const { error } = Joi.validate(this.state.data, this.schema, options)

        if (!error) return null

        const errors = {}
        for (let item of error.details) {
            errors[item.path[0]] = item.message
        }

        console.error(errors)

        return errors



        // if (this.state.data.username.trim() === '')
        //     errors.username = 'Username is required'

        // if (this.state.data.password.trim() === '')
        //     errors.password = 'Password is required'

        // return Object.keys(errors).length === 0 ? null : errors
    }

    handleSubmit = e => {
        e.preventDefault()
        // to disable post this form to the server*

        const errors = this.validate()
        
        console.log("Hello", errors)
        this.setState({ errors: errors || {} })
        if (errors) return

        this.doSubmit()

    }

    handleChange = ({ currentTarget: myInput }) => {

        // console.log(myInput, "MyInput")
        const errors = { ...this.state.errors }
        const errorMsg = this.validateProperty(myInput)

        if (errorMsg) {
            errors[myInput.name] = errorMsg
        }
        else {
            delete errors[myInput.name]
        }

        const data = { ...this.state.data }
        data[myInput.name] = myInput.value;
        this.setState({ data, errors })

    }

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value }
        const schema = { [name]: this.schema[name] }
        const { error } = Joi.validate(obj, schema)
        return error ? error.details[0].message : null
    }

    renderButton = (label) => {

        return (

            <button
                // disabled={this.validate()}
                type="submit"
                className="btn btn-primary jjj">{label}</button>
        )
    }

    renderInput(name, label, type = "text") {
        const { data, errors } = this.state;
        return (
            <Input
                type={type}
                name={name}
                value={data[name]}
                onChange={this.handleChange}
                label={label}
                error={errors[name]}
            />

        )

    }



    renderSelect(name, label, options) {
        const { data, errors } = this.state;
        // console.log(options)
        console.log("hpp",data, name)
        return (
            <Select
                name={name}
                value={options.find(o => o.value == data[name])}
                label={label}
                options={options.map((v) => ({ value: v._id, label: v.name }))}
                onChange={(v, actionMeta) => this.handleChange({ currentTarget: { name, value: v.value } })}
                error={errors[name]}
            />
        );
    }
}

export default Form;