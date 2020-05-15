import React, { Component } from 'react'
import {Container, Row, Button, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux'

import { handleAddAnswer } from '../../actions/questions'

class QuestionAnswer extends Component {

  state = {
    answer: 'optionOne',
    qid:  this.props.location.pathname.replace("/question/", "")
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
    const { dispatch, authedUser } = this.props

    dispatch(handleAddAnswer(authedUser, qid, answer))
    this.props.history.push(`/pool/${qid}`)
  }

  render() {
    const {questions} = this.props
    const questionID = this.state.qid
    const question = questions[questionID]
  
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

function mapStateToProps ({ authedUser, questions }) {
  return {
    authedUser,
    questions
  }
}

export default connect(mapStateToProps)(QuestionAnswer)