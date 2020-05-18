import React, { Component } from 'react'
import {Row, Col, Form, ProgressBar } from 'react-bootstrap'
import { connect } from 'react-redux'

import { PoolFormat } from '../../utils/helpers'

class Pool extends Component {

  render() {
    const {questions, users, authedUser, questionID} = this.props

    const question = PoolFormat(questions, users, questionID, authedUser)

    return (
      <Form>
        <Form.Group as={Row}>
          <Form.Label className="content">
            Asked By {question.name}
          </Form.Label>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label>
            Results:
          </Form.Label>
        </Form.Group>
        <fieldset>
          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={12}>
              {question.optionOne}
            </Form.Label>
            <Col sm={9}>
              <ProgressBar now={question.optionOnePercentage} 
                label={`${question.optionOnePercentage}%`} />
              {question.optionOneText}
            </Col>
            <Col sm={3}>
              {question.optionOneSelected}
            </Col>
          </Form.Group>
        </fieldset>
        <fieldset>
          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={12}>
              {question.optionTwo}
            </Form.Label>
            <Col sm={9}>
              <ProgressBar now={question.optionTwoPercentage} 
                  label={`${question.optionTwoPercentage}%`} />
                {question.optionTwoText}
            </Col>
            <Col sm={3}>
              {question.optionTwoSelected}
            </Col>
          </Form.Group>
        </fieldset>
      </Form>
    )
  }
}

function mapStateToProps ({ authedUser, users, questions }) {
  return {
    authedUser,
    users,
    questions
  }
}

export default connect(mapStateToProps)(Pool)