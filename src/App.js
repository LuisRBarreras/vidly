import React, { Component } from 'react';
import './App.css';
import Movies from './components/movies';
import ListGroup from './components/common/listGroup';
import { getMovies } from "./services/fakeMovieService";
import { getGenres } from './services/fakeGenreService';

class App extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
    genres: getGenres(),
    currentGenre: { _id: "5b21ca3eeb7f6fbccd471819", name: "All" }
  };


  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  // handleIconStyle = movie => {
  //   let style = "fa ";
  //   style += movie.like ? "fa-heart" : "fa-heart-o";
  //   return style;
  // };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleGenreChange = (genre) => {
    if (genre.name === 'All') {
      this.setState({ movies: getMovies(), currentGenre: genre });
      return
    }
    const movies = getMovies().filter(m => m.genre.name === genre.name);
    this.setState({ movies, currentGenre: genre });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  render() {
    const { pageSize, currentPage } = this.state;
    return (
      <main className="container">
        <div className="row">
          <div className="col-3">
            <ListGroup
              genres={this.state.genres}
              currentGenre={this.state.currentGenre}
              onGenreChange={this.handleGenreChange}
            />
          </div>
          <div className="col-9">
            <Movies
              movies={this.state.movies} pageSize={pageSize}
              currentPage={currentPage}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onPageChange={this.handlePageChange}

            />
          </div>
        </div>

      </main>);
  }
}

export default App;
