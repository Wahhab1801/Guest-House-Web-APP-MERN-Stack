import React, { Component } from "react";
import { FaWifi } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import {  GiWindSlap } from "react-icons/gi";
import { FaBroom } from "react-icons/fa";

import Title from "./Title";
export default class Services extends Component {
  state = {
    services: [
      {
        icon: <GiMeal />,
        title: "Food",
        info:
          "Food is served upon request depending on the customer request including extra charges,"
      },
      {
        icon: <GiWindSlap />,
        title: "Air Condtioning",
        info:
          "We offer best living experience with Air Conditioned rooms."
      },
      {
        icon: <FaBroom />,
        title: "House Keeping",
        info:
          "We offer house keeping services and charges are included in the guest house booking fee."
      },
      {
        icon: <FaWifi />,
        title: "Wifi",
        info:
          "We offer enhaced comfortable customer experience by offering free wifi availabe 24/7"
      }
    ]
  };
  render() {
    return (
      <section className="services">
        <Title title="services" />
        <div className="services-center">
          {this.state.services.map(item => {
            return (
              <article key={`item-${item.title}`} className="service">
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}
