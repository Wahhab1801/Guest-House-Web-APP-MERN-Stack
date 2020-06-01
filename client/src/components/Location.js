import React, { Component } from "react";
import Title from "./Title";
import { Link } from "react-router-dom";

import { Map, GoogleApiWrapper } from 'google-maps-react';


class Location extends Component {

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
      />
    );
  }
}

const mapStyles = {
  width: '100%',
  height: '100%',
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDh21H4iALv-GvrZrXjsNIxTd9lXFtboDs"
})(Location);