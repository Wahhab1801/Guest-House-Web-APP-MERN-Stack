import React, { Component } from 'react'
import { Menu, Segment, Container, Button, Icon, Grid, Label } from 'semantic-ui-react'
import EmpolyeesTable, { CreatEmployee } from './Employees'

const apiURL = require("../../config.json").apiURL;

export default class AdminMenu extends Component {
    state = { activeItem: 'employees', employees: [], i: 1, create: false }

    componentDidMount() {
        fetch(apiURL)
            .then(response => response.json())
            .then(({ data }) => this.setState({ employees: data }))
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name, create: false })
    }

    handleSubmit = (value) => {
        console.log(value)
        fetch(`${apiURL}create`, {
            method: 'POST',
            body: new URLSearchParams(value),
            headers: new Headers({
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            })
        }).then(() => this.setState({ edit: false, selectedEmployee: null }))
    }

    handleCreateButton = (e) => {
        this.setState({ create: !this.state.create })
    }

    underConstruction = () => {
        return (
            <>
                <Segment>
                    <Grid centered>
                        <Grid.Row centered verticalAlign='middle'>
                            <Grid.Column width={5} textAlign='center'>
                                <Icon name='setting' size='massive' />
                                <div height="100px" />
                                <Label size="massive">The View is Under Construction. You wil get a Notification when It's Updated.</Label>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </Segment>
            </>
        )
    }

    renderViews = () => {
        var value = this.state.activeItem
        if (this.state.create) {
            switch (value) {
                case 'employees':
                    return (
                        <CreatEmployee handleSubmit={this.handleSubmit} />
                    )
                default:
                    return (
                        <>
                            {this.underConstruction()}
                        </>
                    )
            }
        } else {
            switch (value) {
                case 'employees':
                    console.log('hello')
                    return (
                        this.state.employees.length !== 0 ?
                            <EmpolyeesTable data={this.state.employees} /> : null
                    )
                default:
                    //return <img src="https://images.pexels.com/photos/949587/pexels-photo-949587.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                    return this.underConstruction()
            }
        }
    }

    render() {
        const { activeItem } = this.state
        console.log(this.state)
        return (
            <div style={{ marginBottom: '50px', marginTop: '30px' }}>
                <Container>
                    <Menu pointing>
                        <Menu.Item
                            name='employees'
                            content='Employees'
                            active={activeItem === 'employees'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='clients'
                            content='Clients'
                            active={activeItem === 'clients'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='services'
                            content='Services'
                            active={activeItem === 'services'}
                            onClick={this.handleItemClick}
                        />

                        <Menu.Item position='right'>
                            <Button name='create' onClick={this.handleCreateButton} icon="plus" color='green' />
                        </Menu.Item>
                    </Menu>

                    <Segment style={{ height: '70vh' }}>
                        {this.renderViews()}
                    </Segment>
                </Container>
            </div>
        )
    }
}