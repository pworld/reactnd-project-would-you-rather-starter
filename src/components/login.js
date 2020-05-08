import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select';
import {Container, Row, Button} from 'react-bootstrap';

import { stateLogin } from '../actions/authedUser'

import logo from '../logo.svg'

class Login extends Component {
  state = {
    selectedOption: null,
  }
  handleChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { selectedOption } = this.state
    const { dispatch } = this.props

    dispatch(stateLogin(selectedOption.value))
    localStorage.setItem('loggedin',selectedOption.value)
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
        <form className='new-tweet' onSubmit={this.handleSubmit}>
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
