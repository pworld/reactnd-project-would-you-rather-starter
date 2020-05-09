import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select';
import {Container, Row, Button} from 'react-bootstrap';

import { stateLogin } from '../actions/authedUser'
import { getUser } from '../utils/helpers'

import logo from '../logo.svg'

class Login extends Component {
  state = {
    selectedOption: null,
  }
  handleChange = selectedOption => {
    this.setState(
      { selectedOption }
    );
  }
  handleSubmit = (e,selectUsers) => {
    e.preventDefault()

    const { selectedOption } = this.state
    const { dispatch, users } = this.props

    const user = getUser(selectedOption.value, users)

    dispatch(stateLogin(user))
    localStorage.setItem('loggedin',JSON.stringify(user))
    this.props.history.push('/')
  }
  render() {
    const { selectedOption } = this.state
    const { users } = this.props

    let selectUsers = []
    for (let key in users) {
      const user = { value:users[key].id,label:users[key].name  }
      selectUsers.push(user)
    }

    return (
      <Container>
        <Row>
          <img src={logo} className="App-logo" alt="logo" />
        </Row>
        <Row>
        <form className='new-tweet' onSubmit={(e) => this.handleSubmit(e,selectUsers)}>
          <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={selectUsers}
          />
          <Button variant="primary" type='submit'>Login</Button>
        </form>
        </Row>
      </Container>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    users: users 
  }
}

export default connect(mapStateToProps)(Login)
