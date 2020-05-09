import React, { Component } from 'react'
import {Container, Row, Button, Col} from 'react-bootstrap';
import { connect } from 'react-redux'

import { handleAddQuestion } from '../actions/questions'

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
          <Col md={{ span: 9, offset: 3}} className="app-container-list">
          <h1>Create New Questions</h1>
            <form className='' onSubmit={this.handleSubmit}>
              <Row>
                <input
                  placeholder="What's happening?"
                  value={optionOne}
                  onChange={this.handleChangeOptionOne}
                />
              </Row>
              <Row>
                <input
                  placeholder="What's happening?"
                  value={optionTwo}
                  onChange={this.handleChangeOptionTwo}
                />
              </Row>
              <Row>
                <Button
                  type='submit'
                  disabled={optionOne === '' && optionTwo === ''}>
                    Submit
                </Button>
              </Row>
            </form>
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