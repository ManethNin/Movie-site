import { Component } from "react";
import React from "react";
import { getMovies, deleteMovie } from "../services/movieServices";
import '../index.css';
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/genreServices";
import Genres from "./common/genres";
import _ from 'lodash';
import { Link, Redirect } from 'react-router-dom';
import Search from './common/search';



class Movie extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        sortColumn: { path: 'title', order: 'asc' },
        pageSize: 4,
        searchQuery: "",
        currentGenre: null
    };

    async componentDidMount() {
        const { data } = await getGenres();
        const { data: movies } = await getMovies()
        const genres = [{ _id: '', name: 'All Genres' }, ...data]
        this.setState({ movies, genres })
    }
    handleDelete = async (itemId) => {
        // console.log("delete clicked")

        const original = this.state.movies
        const movies = original.filter(item => (itemId !== item._id))
        this.setState({ movies })
        try {
            await deleteMovie(itemId)
        } catch (ex) {
            if (ex.response && ex.response.status === 404) {
                alert("This post has already been deleted.");

                this.setState({ movies: original });
            }

        }
    }

    handleHeart = (item) => {
        const movies = this.state.movies.map(movie => {
            if (item._id === movie._id) {
                const movie = { ...item, liked: !item.liked }
                return movie
            }
            else {
                return movie
            }
        })

        this.setState({ movies })

    }

    handlePageChange = (page) => {
        console.log(page)
        const currentPage = page
        this.setState({ currentPage });
    }

    handleGenre = (genre) => {
        this.setState({ currentGenre: genre, currentPage: 1, searchQuery: "" })
    }

    handleSort = (sortColumn) => {

        this.setState({ sortColumn })
    }

    getPagedData = () => {
        const { currentPage, pageSize, movies: allMovies, currentGenre, sortColumn, searchQuery } = this.state

        let filtered = allMovies

        if (searchQuery) {
            filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
        }

        else if (currentGenre && currentGenre._id) {
            filtered = allMovies.filter(movie => movie.genre._id === currentGenre._id)
        }



        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
        const movies = paginate(sorted, currentPage, pageSize)

        return { movies, filtered }

    }


    handleSearch = (value) => {
        this.setState({ searchQuery: value, selectedGenre: null, currentPage: 1 })
    }

    render() {
        if (this.state.movies.length === 0) return <h5>There is no any movies</h5>
        const { currentPage, pageSize, currentGenre, sortColumn, searchQuery } = this.state

        const { movies, filtered } = this.getPagedData()

        const { length: count } = filtered
        return (
            <div>

                <div className="row">

                    <div className="col-2">
                        <Genres genres={this.state.genres}
                            currentGenre={currentGenre}
                            onGenrechange={this.handleGenre} />

                    </div>
                    <div className="col">
                        <Link to="/movies/new">
                            <button className="btn btn-primary mybtn" onClick={this.handleNewMovie}>New movie</button>
                        </Link>
                        < h6 >There are {filtered.length} in the bucket</h6 >

                        <Search onChange={this.handleSearch} value={searchQuery} />

                        <MoviesTable sortColumn={sortColumn} movies={movies} onDelete={this.handleDelete} onLike={this.handleHeart} onSort={this.handleSort} />

                        <Pagination itemCount={count} pageSize={pageSize} onPageChange={this.handlePageChange} currentPage={currentPage} />


                    </div>


                </div>
            </div>



        )
    }


}

export default Movie;