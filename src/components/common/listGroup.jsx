import React, { Component } from "react";
import PropTypes from "prop-types";

class ListGroup extends Component {
  state = {};
  render() {
    const { currentGenre } = this.props;

    return (
      <ul className="list-group">
        {this.props.genres.map(genre => {
          return (
            <li
              className={
                genre.name === currentGenre.name
                  ? "list-group-item active"
                  : "list-group-item"
              }
              key={genre._id}
              onClick={() => this.props.onGenreChange(genre)}
            >
              {genre.name}
            </li>
          );
        })}
      </ul>
    );
  }
}

ListGroup.propTypes = {
  genres: PropTypes.array.isRequired,
  onGenreChange: PropTypes.func.isRequired,
  currentGenre: PropTypes.object.isRequired
};

export default ListGroup;
