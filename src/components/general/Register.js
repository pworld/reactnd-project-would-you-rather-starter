import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Container, Row, Col, Button, Form} from 'react-bootstrap';

import { register } from '../../actions/authedUser'

import logo from '../../logo.svg'

class Register extends Component {
  state = {
    name: '',
    password: ''
  }
  handleChangeName = (e) => {
    const text = e.target.value
    this.setState(
      { name: text }
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

    const { name, password } = this.state
    const { questions, dispatch } = this.props

    dispatch(register(name, password, questions))

    this.props.history.push('/login')
  }
  render() {
    const { name, password } = this.state

    return (
      <Container>
        <Row>
          <Col md={{ span: 6,offset:3}} className="justify-content-md-center">
            <Form className='md-12' onSubmit={(e) => this.handleSubmit(e)}>
              <Form.Group as={Row} className="justify-content-md-center">
                <img src={logo} className="App-logo" alt="logo" />
              </Form.Group>
              <Form.Group as={Row} className="justify-content-md-center">
                <Form.Label>Input Name </Form.Label>
                <Col sm={12}>
                  <Form.Control type="text" 
                  placeholder="Input Name"
                  value={name}
                  onChange={(e) => {this.handleChangeName(e)}}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="justify-content-md-center">
                <Form.Label>Input Password </Form.Label>
                <Col sm={12}>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control 
                    type="password" 
                    placeholder="Input Password" 
                    value={password}
                    onChange={(e) => {this.handleChangePassword(e)}}
                    />
                </Form.Group>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col sm={12}>
                  <Button variant="primary" type='submit' disabled={name === null && password === null}>Register</Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

function mapStateToProps ({ questions }) {
  return {
    questions 
  }
}

export default connect(mapStateToProps)(Register)
