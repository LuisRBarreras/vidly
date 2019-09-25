import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import MovieDetails from "./components/movieDetails"
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NavBar from './components/navBar';
import NotFound from './components/notFound';

class App extends Component {

  render() {
    return (
      <main className="container">
        <NavBar />
        <Switch>
          <Route path="/movies/:id" component={MovieDetails} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />

          <Route path="/not-found" exact component={NotFound} />
          <Route path="/" exact component={Movies} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    );
  }
}

export default App;
