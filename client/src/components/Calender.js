import React, { Component } from 'react';

import { Segment, Dropdown, Input, Button, Icon, Table, Popup, Dimmer, Loader, Label } from 'semantic-ui-react'

const month = [
    {
        value: 0,
        text: "January"
    }, {
        value: 1,
        text: "February"
    }, {
        value: 2,
        text: "March"
    }, {
        value: 3,
        text: "April"
    }, {
        value: 4,
        text: "May"
    }, {
        value: 5,
        text: "June"
    }, {
        value: 6,
        text: "July"
    }, {
        value: 7,
        text: "August"
    }, {
        value: 8,
        text: "September"
    }, {
        value: 9,
        text: "October"
    }, {
        value: 10,
        text: "November"
    }, {
        value: 11,
        text: "December"
    }
]
const dayNamesShort = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

class Calender extends Component {

    state = {
        selectedMonth: -1,
        selectedYear: -1,
        daysInSelectedMonth: 0,
        startingWeekDay: 0,
        dayProps: undefined,
        dateLoadPermitted: true
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setDayProps(nextProps.DayStyles);
    }

    setDayProps = (DayStyles) => {
        if (DayStyles !== undefined) {
            const newDayStyles = {}
            for (var i = 1; i < this.state.daysInSelectedMonth + 1; i++) {
                newDayStyles[i] = {
                    styles: {}
                }
            }
            Object.keys(DayStyles).forEach((key) => {
                newDayStyles[key] = DayStyles[key]
            })
            this.setState({ dayProps: newDayStyles })
        }
    }


    setCalender = (month, year) => {
        const daysInCurrentMonth = new Date(year, month + 1, 0).getDate()
        const startingWeekDay = new Date(year + "-" + (month + 1) + "-01").getDay()
        const tempProps = {};
        for (var i = 1; i < daysInCurrentMonth + 1; i++) {
            tempProps[i] = {
                styles: {}
            }
        }
        this.setState({
            selectedMonth: month,
            selectedYear: year,
            daysInSelectedMonth: daysInCurrentMonth,
            startingWeekDay: startingWeekDay,
            dayProps: tempProps
        })
        //this.props.onMonthChange(daysInCurrentMonth, month, year);
        this.setDayProps()
    }

    componentDidMount = () => {
        const date = new Date();
        const currentMonth = date.getMonth()
        const currentYear = date.getFullYear();
        this.setCalender(currentMonth, currentYear)
    }

    changeMonthByOne = (x) => {
        if (this.state.selectedMonth + x === 12) {
            this.setCalender(0, this.state.selectedYear + 1)
        } else if (this.state.selectedMonth + x === -1) {
            this.setCalender(11, this.state.selectedYear - 1)
        } else {
            this.setCalender(this.state.selectedMonth + x, this.state.selectedYear)
        }

    }

    renderTimeChangeBar = () => {
        return (
            <Segment>
                <Dropdown
                    selection
                    value={this.state.selectedMonth}
                    search
                    onChange={(e, { value }) => this.setCalender(value, this.state.selectedYear)}
                    options={month}
                />
                <span style={{ marginLeft: '5px' }}></span>
                <Input
                    value={this.state.selectedYear}
                    onChange={(e, { value }) => {
                        if (this.state.dateLoadPermitted) {
                            this.setCalender(this.state.selectedMonth, Number(value))
                        } else {
                            this.setState({ selectedYear: Number(value) })
                        }
                    }}
                    onFocus={() => this.setState({ dateLoadPermitted: false })}
                    onBlur={(e) => { this.setState({ dateLoadPermitted: true }); this.setCalender(this.state.selectedMonth, Number(e.target.value)) }}
                    type="number"
                />
                <Button
                    floated="right"
                    icon
                    onClick={() => this.changeMonthByOne(1)}
                >
                    <Icon size="large" name="angle down" />
                </Button>
                <Button
                    floated="right"
                    icon
                    onClick={() => this.changeMonthByOne(-1)}
                >
                    <Icon size="large" name="angle up" />
                </Button>
            </Segment>
        )
    }


    returnCalenderLabel = (date, dayProps) => {
        if (dayProps !== undefined) {
            if (dayProps.label !== undefined && dayProps.label !== null && dayProps.label.length > 0) {
                return (
                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', top: -40, right: -20 }}>
                            {dayProps.label.map(x =>
                                <div key={`${date} ${x}`}>
                                    <div
                                        style={{
                                            fontSize: '0.8rem',
                                            backgroundColor: 'white',
                                            textAlign: 'center',
                                            color: 'black',
                                            borderRadius: 3,
                                            borderStyle: 'solid',
                                            borderWidth: 0,
                                            paddingRight: 5,
                                            paddingLeft: 5,
                                            paddingTop: 2,
                                            paddingBottom: 2,
                                        }}>{x}</div>
                                    <div style={{ marginBottom: 2 }} />
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
        }
    }

    returnCalenderCell = (date) => {
        return (
            this.state.dayProps[date] !== undefined ?
                this.state.dayProps[date].popUp !== undefined && this.state.dayProps[date].popUp !== null ?
                    <Popup
                        basic
                        key={date}
                        content={this.state.dayProps[date].popUp}
                        trigger={
                            <Table.Cell
                                onClick={this.props.onClick !== undefined ? () => this.props.onClick(date) : null}
                                style={{ ...this.props.loading ? null : this.state.dayProps[date].styles, fontSize: '1.2rem', fontWeight: 'bold' }}>
                                {date}
                                {this.returnCalenderLabel(date, this.state.dayProps[date])}
                            </Table.Cell>}
                    />
                    :
                    <Table.Cell key={date}
                        onClick={this.props.onClick !== undefined ? () => this.props.onClick(date) : null}
                        style={{ ...this.props.loading ? null : this.state.dayProps[date].styles, fontSize: '1.2rem', fontWeight: 'bold' }}>
                        {date}
                        {this.returnCalenderLabel(date, this.state.dayProps[date])}
                    </Table.Cell>
                : <Table.Cell key={date}
                    onClick={this.props.onClick !== undefined ? () => this.props.onClick(date) : null}
                    style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                >{date}</Table.Cell>
        )
    }

    renderCalenderGrid = () => {
        let i = 0;
        return (
            <div>
                {this.state.dayProps !== undefined ?
                    <Table padded="very" celled unstackable size="large">
                        <Table.Header>
                            <Table.Row>
                                {dayNamesShort.map(x => <Table.HeaderCell key={x}>{x}</Table.HeaderCell>)}
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                {[...Array(this.state.startingWeekDay).keys()].map(x =>
                                    <Table.Cell key={'emptystart' + x}></Table.Cell>
                                )}
                                {[...Array(7 - this.state.startingWeekDay).keys()].map(x =>
                                    this.returnCalenderCell(++i)
                                )}
                            </Table.Row>
                            {[...Array(Math.ceil(Math.abs(this.state.daysInSelectedMonth - i) / 7) - 1).keys()].map(x => {
                                return (
                                    <Table.Row key={'rowmid' + x} >
                                        {[...Array(7).keys()].map(y =>
                                            this.returnCalenderCell(++i)
                                        )}
                                    </Table.Row>
                                )
                            })}
                            <Table.Row>
                                {[...Array(Math.abs(7)).keys()].map(x => {
                                    if (this.state.daysInSelectedMonth - i > 0) {
                                        return this.returnCalenderCell(++i)
                                    } else {
                                        return <Table.Cell key={`emptyend${x}`}></Table.Cell>
                                    }
                                }
                                )}
                            </Table.Row>
                        </Table.Body>
                    </Table>
                    :
                    null
                }

            </div>
        )
    }

    renderHoldingSegment = () => {
        return (
            <div style={
                {
                    paddingBottom: '10px',
                    position: 'relative'
                }
            }
            >
                <Dimmer active={this.props.loading} inverted>
                    <Loader size="massive" active={this.props.loading}>Loading Calender</Loader>
                </Dimmer>
                {this.renderCalenderGrid()}
            </div>
        )
    }

    render() {
        return (
            <Segment>
                {this.renderTimeChangeBar()}
                {this.renderHoldingSegment()}
            </Segment>
        )
    }
}

export default Calender;