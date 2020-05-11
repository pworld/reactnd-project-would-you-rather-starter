import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select';
import {Container, Row, Col, Button, Form} from 'react-bootstrap';

import { handleAnsweredQuestion } from '../../actions/questions'
import { stateLogin } from '../../actions/authedUser'
import { getUser } from '../../utils/helpers'

import logo from '../../logo.svg'

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
    const { dispatch, users, questions } = this.props

    const user = getUser(selectedOption.value, users)

    localStorage.setItem('loggedin',JSON.stringify(user))
    dispatch(stateLogin(user))
    dispatch(handleAnsweredQuestion(user, questions))

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
        <Row className="justify-content-md-center">
          <Form className='md-12' onSubmit={(e) => this.handleSubmit(e,selectUsers)}>
            <Form.Group as={Row} className="justify-content-md-center">
              <img src={logo} className="App-logo" alt="logo" />
            </Form.Group>
            <Form.Group as={Row} className="justify-content-md-center">
              <Col sm={12}>
                <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={selectUsers}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm={12}>
                <Button variant="primary" type='submit' disabled={this.state.selectedOption === null}>Signin</Button>
              </Col>
            </Form.Group>
        </Form>
        </Row>
      </Container>
    )
  }
}

function mapStateToProps ({ users,questions }) {
  return {
    users, questions 
  }
}

export default connect(mapStateToProps)(Login)
