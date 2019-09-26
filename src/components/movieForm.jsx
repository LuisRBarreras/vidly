import React, { Component } from "react";

class MovieForm extends Component {
  handleSave = () => {
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Forms - {this.props.match.params.id} </h1>
        <button onClick={this.handleSave} className="btn btn-primary">
          Save
        </button>
      </div>
    );
  }
}

export default MovieForm;
