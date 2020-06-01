import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import Bar from '../components/Bar';
import Description from '../components/Description';
import Services from "../components/Services";
import FeaturedRooms from "../components/FeaturedRooms";
import Address from "../components/Address";
import Availabilty from "../components/Availablity";


import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import 'react-widgets/dist/css/react-widgets.css';
import moment from 'moment'
import momentLocaliser from 'react-widgets-moment'
import { Grid, Button } from "semantic-ui-react";
momentLocaliser(moment)


const home = () => {
  return (
    <>
      <Hero>
        <Banner
          title="Dream Villas"
          subtitle="Booking starting at $299"
        >
          <Link to="/rooms" className="btn-primary">
            our rooms
          </Link>
        </Banner>
      </Hero>
      <Bar>
        <Grid centered >
          <Grid.Row color='black' centered columns={4}>
            <Grid.Column width={4}>
              <DateTimePicker
                placeholder="Arrive"
                onChange={value => console.log(value)}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <DateTimePicker
                placeholder="Depart"
                onChange={value => console.log(value)}
              />
            </Grid.Column>
            <Grid.Column width={2}>
              <Button content='Book' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/* <div>
          <div style={{ alignItems: 'center' }} >
            <DateTimePicker />
          </div>
          <div style={{ width: '140px' }} />
          <div style={{ alignItems: 'center' }}>
            <DateTimePicker />
          </div>
          <div style={{ width: '100px' }} />
          <button className='btn-primary'>
            Book Now
          </button>
        </div> */}
      </Bar>

      <Description />
      <Services />
      <FeaturedRooms />


      <Availabilty />
    </>
  );
};

export default home;
