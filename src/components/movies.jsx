import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete = movie => {
    deleteMovie(movie._id);
    this.setState({ movies: getMovies() });
  };

  renderMovie = movie => {
    return (
      <tr key={movie._id}>
        <td>{movie.title}</td>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => {
              this.handleDelete(movie);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  };

  formatSummary = () => {
    if (this.state.movies.length === 0) return <p> There are no movies</p>;
    return <p>'howing {this.state.movies.length} in the database</p>;
  };

  render() {
    return (
      <div>
        <div>{this.formatSummary()}</div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => this.renderMovie(movie))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Movies;
