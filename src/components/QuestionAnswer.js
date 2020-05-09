import React, { Component } from 'react'
import {Container, Row, Button, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux'

import { handleAddAnswer } from '../actions/questions'

class QuestionAnswer extends Component {

  state = {
    answer: '',
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

    dispatch(handleAddAnswer(authedUser.id, qid, answer))
  }

  render() {
    const {authedUser, questions} = this.props
    const questionID = this.state.qid
    const question = questions[questionID]
  
    return (
      <Container>

        <Row className="justify-content-md-center">
          <Col md={{ span: 3}} className="app-container-list">
            <img
              src={`https://robohash.org/${authedUser.id}`}
              alt={`${authedUser.name}`}
              className='avatar'
            />
          </Col>
          <Col md={{ span: 9}} className="app-container-list">
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
                    />
                    <Form.Check
                      type="radio"
                      label={question.optionTwo.text}
                      name="answer"
                      id="answer"
                      value="optionTwo"
                      onChange={this.onSiteChanged}
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