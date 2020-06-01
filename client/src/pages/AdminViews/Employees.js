import React from 'react'
import { Table, Button, Segment, Form, Grid, Header, Icon } from 'semantic-ui-react'
const apiURL = require("../../config.json").apiURL;



class EmployeesTable extends React.Component {


    state = {
        employees: [],
        edit: false,
        selectedEmployee: null,
        employee_name: null,
        phone_no: null,
        role: null
    }

    componentDidMount = () => {
        console.log(this.props.data)
        this.setState({ employees: this.props.data })
    }

    actionButtons = (value) => {
        return (
            <>
                <Button
                    icon='edit'
                    color='blue'
                    size="mini"
                    onClick={() => {
                        this.setState({
                            selectedEmployee: value,
                            employee_name: value.employee_name,
                            phone_no: value.phone_no,
                            role: value.role,
                            edit: true
                        })
                    }
                    }
                />
                <Button
                    disabled
                    icon='x'
                    color='red'
                    size="mini"
                    onClick={() => this.deleteHandle(value)}
                />
            </>
        )
    }

    deleteHandle = (value) => {
        console.log(value)
        fetch(`${apiURL}delete/${value.id}`, {
            method: 'DELETE'
        }).then(() => this.setState({ edit: false, selectedEmployee: null }))

    }

    handleSubmit = (e) => {
        var data = {}
        data.employee_name = this.state.employee_name
        data.phone_no = this.state.phone_no
        data.role = this.state.role

        fetch(`${apiURL}update/${this.state.selectedEmployee.employee_id}`, {
            method: 'PUT',
            body: new URLSearchParams(data),
            headers: new Headers({
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            })
        }).then(() => this.setState({ edit: false, selectedEmployee: null }))
        this.componentDidMount()
        //console.log(response)
    }



    onInputChange = (event, { value }) => {
        console.log(event.target.name)
        this.setState({
            [event.target.name]: value
        })
    }

    editEmployee = () => {
        var employee = this.state.selectedEmployee;

        return (
            <>
                <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }} >
                        <Header color='teal' textAlign='center'>
                            <Icon name='user' /> {`Edit Employee with Id : ${employee.employee_id}`}
                        </Header>
                        <Form
                            onSubmit={(event) => this.handleSubmit(event)}
                            style={{ size: 'tiny' }}>
                            <Segment>
                                <Form.Input
                                    icon='user'
                                    name='employee_name'
                                    iconPosition='left'
                                    placeholder='Name'
                                    onChange={this.onInputChange}
                                    defaultValue={employee.employee_name}
                                    type='text'
                                />
                                <Form.Input
                                    name='phone_no'
                                    icon='phone'
                                    iconPosition='left'
                                    placeholder='Phone'
                                    onChange={this.onInputChange}
                                    defaultValue={employee.phone_no}
                                    type='text'
                                />
                                <Form.Input
                                    name='role'
                                    icon='tag'
                                    iconPosition='left'
                                    placeholder='Role'
                                    onChange={this.onInputChange}
                                    defaultValue={employee.role}
                                    type='text'
                                />
                                <Button
                                    color='teal'
                                    fluid
                                    size='large'
                                    content='Edit'
                                    type='submit'
                                //onClick={() => this.setState({ edit: false })}
                                />
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </>
        )
    }

    showTable = () => {

        return (
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Phone</Table.HeaderCell>
                        <Table.HeaderCell>Roles</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.state.employees.size === 0 ? null :


                        this.state.employees.map(x => {
                            return (
                                <Table.Row key={x.employee_id}>
                                    <Table.Cell>{x.employee_id}</Table.Cell>
                                    <Table.Cell>{x.employee_name}</Table.Cell>
                                    <Table.Cell>{x.phone_no}</Table.Cell>
                                    <Table.Cell>{x.role}</Table.Cell>
                                    <Table.Cell style={{ width: '1%', whiteSpace: 'nowrap' }}>{this.actionButtons(x)}</Table.Cell>
                                </Table.Row>
                            )
                        })
                    }

                </Table.Body>
            </Table >
        )
    }

    render() {
        return (
            <>
                {this.state.edit ? this.editEmployee() : this.showTable()}
            </>
        )
    }
}


export default EmployeesTable;


export class CreatEmployee extends React.Component {

    state = {
        employee_name: null,
        phone_no: null,
        role: null
    }

    onSubmit = () => {
        this.props.handleSubmit(this.state)
    }

    onInputChange = (event, { value }) => {
        console.log(event.target.name)
        this.setState({
            [event.target.name]: value
        })
    }

    createEmployee = () => {

        return (
            <>
                <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }} >
                        <Header color='teal' textAlign='center'>
                            <Icon name='add user' /> {`Create a New Employee`}
                        </Header>
                        <Form
                            onSubmit={this.onSubmit}
                            style={{ size: 'tiny' }}>
                            <Segment>
                                <Form.Input
                                    icon='user'
                                    name='employee_name'
                                    iconPosition='left'
                                    placeholder='Name'
                                    onChange={this.onInputChange}
                                    type='text'
                                />
                                <Form.Input
                                    name='phone_no'
                                    icon='phone'
                                    iconPosition='left'
                                    placeholder='Phone'
                                    onChange={this.onInputChange}
                                    type='text'
                                />
                                <Form.Input
                                    name='role'
                                    icon='tag'
                                    iconPosition='left'
                                    placeholder='Role'
                                    onChange={this.onInputChange}
                                    type='text'
                                />
                                <Button
                                    color='teal'
                                    fluid
                                    size='large'
                                    content='Add'
                                    type='submit'
                                //onClick={() => this.setState({ edit: false })}
                                />
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </>
        )
    }


    render() {
        return (
            <>
                {this.createEmployee()}
            </>

        )
    }
}