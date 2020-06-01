import React, { Component } from "react";
import Title from "./Title";
import { RoomContext } from "../context";
import Room from "./Room";
import ItemsCarousel from 'react-items-carousel';
import range from 'lodash/range';
import Loading from "./Loading";
import images from './images'
export default class FeaturedRooms extends Component {
  static contextType = RoomContext;

  componentWillMount() {
    this.setState({
      children: [],
      activeItemIndex: 0,
    });

    setTimeout(() => {
      this.setState({
        children: this.createChildren(20),
      })
    }, 100);
  }


  //createChildren = n => range(n).map(i => <div key={i} style={{ height: 200, background: 'black' }}>{i}</div>);

  createChildren = () => images.map(({ id, src, title }) => <img key={id} src={src} title={title} alt={title} style={{ height: 275 }} />);


  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

  render() {
    const {
      activeItemIndex,
      children,
    } = this.state;

    return (
      <ItemsCarousel
        // Placeholder configurations
        enablePlaceholder
        numberOfPlaceholderItems={5}
        minimumPlaceholderTime={1000}
        placeholderItem={<div style={{ height: 290, background: '#900' }}>Placeholder</div>}

        // Carousel configurations
        numberOfCards={3}
        gutter={1}
        showSlither={true}
        firstAndLastGutter={true}
        freeScrolling={false}

        // Active item configurations
        requestToChangeActive={this.changeActiveItem}
        activeItemIndex={activeItemIndex}
        activePosition={'center'}

        chevronWidth={24}
        rightChevron={'>'}
        leftChevron={'<'}
        outsideChevron={false}
      >
        {children}
      </ItemsCarousel>
    );
  }
} 