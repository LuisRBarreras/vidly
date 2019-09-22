import React, { Component } from "react";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  renderMovie = movie => {
    return (
      <tr key={movie._id}>
        <td>{movie.title}</td>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td>
          <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
        </td>
        <td>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              this.props.onDelete(movie);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  };

  render() {
    const { length: count } = this.props.movies;
    const { pageSize, currentPage, movies: allMovies } = this.props;
    if (count === 0) return <p> There are no movies in the database.</p>;

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <React.Fragment>
        <p>Showing {count} in the database.</p>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{movies.map(movie => this.renderMovie(movie))}</tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.props.onPageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
