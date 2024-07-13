import React, { Component } from 'react';
import { genres } from '../../services/fakeGenreService';

const Genres = (props) => {
    const { genres, textProperty, valueProperty, onGenrechange, currentGenre } = props;

    return (
        <div>
            <ul className="list-group">

                {genres.map((genre) => (

                    <li className={(genre === currentGenre) ? 'list-group-item active' : 'list-group-item'}
                        key={genre[valueProperty]} style={{ cursor: 'pointer' }}
                        onClick={() => onGenrechange(genre)} >
                        {genre[textProperty]}
                    </li>
                ))}

            </ul></div>);

}

Genres.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}

export default Genres;