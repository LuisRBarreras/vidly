import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm"
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NavBar from './components/navBar';
import NotFound from './components/notFound';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import './App.css';

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies/new" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />

            <Route path="/not-found" exact component={NotFound} />

            <Redirect from="/" to="/movies" exact />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;

