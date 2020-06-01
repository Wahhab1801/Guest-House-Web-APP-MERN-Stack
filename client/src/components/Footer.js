import React, { Component } from "react";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import { Rating } from 'semantic-ui-react'


export default class Footer extends Component {
  state = {

  }

  render() {
    return (
      <>
        <div className="nav-footer" style={{ alignItems: 'center' }}>
          <Link to="/">
            <img src={logo} alt="Hello" />
          </Link>
          <div><Rating defaultRating={3} maxRating={5} size='small' /></div>
          <address className="body" style={{ alignItems: 'center'}}>
            You can contact author at <a href="http://www.somedomain.com/contact">
              www.somedomain.com</a>.<br></br>
              You may also want to visit us:<br/>
              Dream Villas<br/>
              IBA boys Hostel<br/>
              KU Circular Road, Karachi University<br/>
              Karachi
               </address>
        </div>
      </>
                  );
                }
}