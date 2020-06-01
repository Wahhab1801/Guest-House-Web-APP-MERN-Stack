import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import AMenu from './AdminViews/AdminMenu'

class Admin extends React.Component {

    state = {
        admin: null
    }

    render() {
        return (
            <>
               <AMenu />
            </>
        )
    }
}



export default Admin;