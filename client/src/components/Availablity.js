import React, { Component } from "react";
import Title from "./Title";
import { Grid, Form, Segment } from 'semantic-ui-react'

import Calendar from 'react-widgets/lib/Calendar'
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import 'react-widgets/dist/css/react-widgets.css';
import moment from 'moment'
import momentLocaliser from 'react-widgets-moment'
momentLocaliser(moment)


class Availability extends Component {


    render() {
        var current = new Date();
        current.setMonth(current.getMonth() + 1);
        return (
            <section className="Availability">
                <Title title="Availability" />
                <Grid centered>
                    <Grid.Row centered>
                        <Grid.Column width={6}>
                            <Calendar defaultValue={new Date()}  footer={false} />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Calendar defaultValue={current}  footer={false} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <div height='100px' />

            </section>
        );
    }
}

// const renderDateTimePicker = ({ input: { onChange, value }, showTime, placeholder, label }) => {
//     return (
//         <>
//             <>
//                 <span>{label}</span>
//                 <div style={{ marginBottom: '1px' }} />
//             </>
//             <DateTimePicker
//                 onChange={onChange}
//                 format="DD-MM-YYYY"
//                 placeholder={placeholder}
//                 time={showTime}
//                 value={!value ? null : new Date(value)}
//             />
//         </>
//     )
// }


export default Availability;