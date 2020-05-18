import React, { Component } from 'react'
import {Row, Button, Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux'


class PoolQuestion extends Component {

  state = {
    answer: 'optionOne',
    question: {},
    isPoolQuestion: true,
  }

  render() {
    const {
      answerSelected, 
      question,
      onHandleSubmit,
      onSiteChanged} = this.props

    return (
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
                onChange={onSiteChanged}
                defaultChecked ={answerSelected === "optionOne"}
              />
              <Form.Check
                type="radio"
                label={question.optionTwo.text}
                name="answer"
                id="answer"
                value="optionTwo"
                onChange={onSiteChanged}
                defaultChecked ={answerSelected === "optionTwo"}
              />
            </Col>
            <Button variant="primary" onClick={onHandleSubmit} >Submit</Button>
          </Form.Group>
        </fieldset>
      </Form>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(PoolQuestion)