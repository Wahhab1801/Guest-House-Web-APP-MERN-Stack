import React, { Component } from "react";
import "./App.css";

import Login from './pages/Login'
import Admin from './pages/Admin'
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";
import Error from "./pages/Error";
import Location from "./components/Location"
import Navbar from "./components/Navbar";
//import Bar from './components/Bar';

import { Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";

class App extends Component {
  state = { employees: null }

  componentDidMount() {
    fetch("http://localhost:5000/employees/")
      .then(response => response.json())
      .then(({ data }) => this.setState({ employees: data }))
    // fetch("http://localhost:5000/employees/")
    //   .then(response => {
    //     console.log(response)
    //   })
    // .then(resJson => {
    //   console.log(resJson)
    //   //this.setState({ employees: resJson })
    // });
  }
  render() {
    console.log(this.state.employees)
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/Admin" component={Login} />
          <Route exact path="/Location" component={Location} />
          <Route exact path="/Admin/Dashboard" component={Admin} />
          <Route exact path="/" component={Home} data={this.state.employees} />
          <Route exact path="/rooms/" component={Rooms} data={this.state.employees} />
          <Route exact path="/rooms/:slug" component={SingleRoom} />
          <Route component={Error} />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default App;
