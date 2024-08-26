import { Component } from "react";
import React from 'react';
import Input from './common/input';
import Form from './common/form';
import Joi from 'joi-browser';
import { Route } from 'react-router-dom';
import { getMovies, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/genreServices";

class MovieForm extends Form {

    state = {
        data: { title: "", numberInStock: "", rate: "", genreId: "" },
        errors: {},
        genres: []
    }

    async componentDidMount() {
        const { data: genres } = await getGenres()
        console.log(genres)
        this.setState({ genres })
    }

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label("Title"),
        numberInStock: Joi.string().required().label("Number in Stock"),
        rate: Joi.string().required().label("Rate"),
        genreId: Joi.string().required().label("Genre"),
        id: Joi.string()

    }

    doSubmit = () => {
        console.log("Hello 123",this.state.data)
        fetch('http://localhost:3900/api/movies', {method:"POST",body: JSON.stringify(this.state.data)}).then(res => {

            this.props.history.push('/movies')
            const data = this.state.data
            data._id = this.props.match.params.iiid
            this.setState({ data })
            
            saveMovie(data)
        })


    }

    render() {
        return (
            <div >
                <h1>Movie Form </h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title')}
                    {this.renderInput('numberInStock', 'Number in stock')}
                    {this.renderInput('rate', 'Rate')}
                    {/* {console.log(this.state.genres)} */}
                    {this.renderSelect("genreId", "Genre", this.state.genres)}
                    {this.renderButton('Save')}
                </form>

            </div>
        );

    }

}

export default MovieForm;