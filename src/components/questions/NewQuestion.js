import React, { Component } from 'react'
import {Container, Row, Button, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux'

import { handleAddQuestion } from '../../actions/questions'

class NewQuestions extends Component {

  state = {
    optionOne: '',
    optionTwo: '',
  }

  handleChangeOptionOne = (e) => {
    const text = e.target.value

    this.setState(() => ({
      optionOne:text
    }))
  }

  handleChangeOptionTwo = (e) => {
    const text = e.target.value

    this.setState(() => ({
      optionTwo:text
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOne, optionTwo } = this.state
    const { dispatch, authedUser } = this.props

    dispatch(handleAddQuestion(optionOne, optionTwo, authedUser.id))

    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
    }))
  }
  render() {
    const { optionOne, optionTwo } = this.state
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col className="app-container-list">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group as={Row}>
                <Form.Label>
                Create New Questions
                </Form.Label>
              </Form.Group>

              <fieldset>
                <Form.Group as={Row}>
                  <Form.Label as="legend" column sm={2}>
                    Option 1
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control type="text" placeholder="Option One" value={optionOne} onChange={this.handleChangeOptionOne} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label as="legend" column sm={2}>
                    Option 2
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control type="text" placeholder="Option Two" value={optionTwo} onChange={this.handleChangeOptionTwo} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                <Button type='submit' disabled={optionOne === '' && optionTwo === '' && optionOne === optionTwo}>Submit</Button>
                </Form.Group>
              </fieldset>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(NewQuestions)