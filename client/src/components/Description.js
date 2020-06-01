import React, { Component } from "react";
import { GiMeal, GiWindSlap, HouseKeeping, Wifi } from "react-icons/fa";
import Title from "./Title";
export default class Description extends Component {
    state = {
   //     description: "Hello there"
    };

    render() {
        return (
            <section className="description">
                <Title title="description" />
                <div>
                    <p>{this.state.description}</p>
                    We welcome you to our online reservation system.
Get a luxurious guest house booked without any hassle. Sounds cool? Here we are, bringing you reliable and excellent services that have all your needs covered. You can find all the detailed information about our guest house, its cozy rooms, food service, costs – almost everything- here because we care for your ease. 
Having promised to provide the best amongst the best services
            {/* {this.state.description.map(item => {
                        return (
                            <article key={`item-${item.title}`} className="description">
                                <span>{item.icon}</span>
                                <h6>{item.title}</h6>
                                <p>{item.info}</p>
                            </article>
                        );
                    })} */}
                </div>
            </section>
        );
    }
}
