import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class MovieForm extends Form {
  state = {
    data: { title: "", numberInStock: 0, dailyRentalRate: 0 },
    errors: {}
  };
  doSubmit = () => {
    this.props.history.push("/movies");
  };

  componentDidMount() {
    //todo lodad movie
  }

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    // genre: Joi.string()
    //   .required()
    //   .label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .integer()
      .min(0)
      .max(10)
      .required()
      .label("Rate")
  };

  render() {
    return (
      <div>
        <h1>Movie Forms - {this.props.match.params.id} </h1>
        <form action="" onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {/* {this.renderInput("genre.name", "Genre")} */}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
        </form>
        <button onClick={this.handleSave} className="btn btn-primary">
          Save
        </button>
      </div>
    );
  }
}

export default MovieForm;

//movieForm
// title/genre,numberInStock(0, 100), rate(0, 10)
//save movie
// display newMovie
// editForm
//handle delete correctly
//validate form url id
//go back and submit should be populated
