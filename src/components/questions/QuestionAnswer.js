import React, { Component } from 'react'
import {Container, Row, Button, Col, Form } from 'react-bootstrap';
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

import { handleAddAnswer } from '../../actions/questions'

class QuestionAnswer extends Component {

  state = {
    answer: typeof this.props.authedUser.answers[this.props.match.params.id] !== 'undefined' ? 
    this.props.authedUser.answers[this.props.match.params.id] : 'optionOne',
  }

  setAnswer = (authedUser, questionID) => {
    this.setState(() => ({
      answer:authedUser.answers[questionID] ?
            authedUser.answers[questionID] : 'optionOne'
    }))
  }

  onSiteChanged = (e) => {
    const value = e.target.value

    this.setState(() => ({
      answer:value
    }))
  }

  onHandleSubmit = (e) => {
    e.preventDefault()

    const { answer, qid } = this.state
    const { dispatch, history, authedUser } = this.props

    dispatch(handleAddAnswer(authedUser, qid, answer))

    setTimeout(() => {
      history.push(`/questions/${qid}`)
    }, 1500)
  }

  render() {
    const {questions, authedUser} = this.props
    const questionID = this.props.match.params.id
    const question = questions[questionID]

    if( typeof authedUser === 'undefined'){
      return (<Redirect to='/login' />)
    }else if(typeof question === 'undefined'){
      return (<Redirect to='/404' />)
    }

    return (
      <Container>

        <Row className="justify-content-md-center app-container-list">
          <Col md={{ span: 3}}>
            <img
              src={`https://robohash.org/${question.author}`}
              alt={`${question.author}`}
              className='avatar'
            />
          </Col>
          <Col md={{ span: 9}}>
            <Form>
              <Form.Group as={Row}>
                <Form.Label>
                  Would You Rather?
                </Form.Label>
              </Form.Group>

              <fieldset>
                <Form.Group as={Row}>
                  <Form.Label as="legend" column sm={2}>
                    Choose
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Check
                      type="radio"
                      label={question.optionOne.text}
                      name="answer"
                      id="answer"
                      value="optionOne" 
                      onChange={this.onSiteChanged}
                      checked={this.state.answer === "optionOne"}
                    />
                    <Form.Check
                      type="radio"
                      label={question.optionTwo.text}
                      name="answer"
                      id="answer"
                      value="optionTwo"
                      onChange={this.onSiteChanged}
                      checked={this.state.answer === "optionTwo"}
                    />
                  </Col>
                  <Button variant="primary" onClick={this.onHandleSubmit}>Submit</Button>
                </Form.Group>
              </fieldset>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

function mapStateToProps ({ authedUser, questions, location }) {
  return {
    authedUser,
    questions
  }
}

export default connect(mapStateToProps)(QuestionAnswer)