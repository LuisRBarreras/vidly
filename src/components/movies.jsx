import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import { paginate } from "../utils/paginate";
import ListGroup from "../components/common/listGroup";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    selectedGenre: null,
    searchQuery: ""
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  handleOnClick = () => {
    this.props.history.push("/movies/new");
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p> There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>

          <p>Showing {totalCount} in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />

          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
