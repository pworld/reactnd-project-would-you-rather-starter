import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { Link,Redirect } from 'react-router-dom'
import {Container, Row, Col, Button, Form} from 'react-bootstrap';

import { stateLogin } from '../../actions/authedUser'

import logo from '../../logo.svg'

class Login extends Component {
  state = {
    selectedOption: null,
    password: '',
    redirectToReferrer: false
  }
  handleChange = selectedOption => {
    this.setState(
      { selectedOption }
    );
  }
  handleChangePassword = (e) => {
    const text = e.target.value
    this.setState(
      { password: text }
    );
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { selectedOption, password } = this.state
    const { dispatch, users, questions } = this.props

    const isLoggedIn = dispatch(stateLogin(users, selectedOption.value, password, questions))

    if(isLoggedIn){
      this.setState(() => ({
        redirectToReferrer: true
      }))
    }else {
      alert('login failed')
    }
  }
  render() {
    const { selectedOption, password, redirectToReferrer } = this.state
    const { users } = this.props

    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    let selectUsers = []
    for (let key in users) {
      const user = { value:users[key].id,label:users[key].name  }
      selectUsers.push(user)
    }

    return (
      <Container>
        <Row>
          <Col md={{ span: 6,offset:3}} className="justify-content-md-center">
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
              <Form.Group as={Row} className="justify-content-md-center">
                <Col sm={12}>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control 
                    type="password" 
                    placeholder="Please Fill Password. default:'password'" 
                    value={password}
                    onChange={(e) => {this.handleChangePassword(e)}}
                    />
                </Form.Group>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Col sm={12}>
                <Form.Label><Link to='/register'>Click for Register</Link></Form.Label>
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Col sm={12}>
                  <Button variant="primary" type='submit' disabled={this.state.selectedOption === null}>Signin</Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
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
