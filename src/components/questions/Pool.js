import React, { Component } from 'react'
import {Container, Row, Col, Form, ProgressBar } from 'react-bootstrap';
import { connect } from 'react-redux'

import { PoolFormat } from '../../utils/helpers'

class Pool extends Component {

  state = {
    qid:  this.props.location.pathname.replace("/questions/", "")
  }

  render() {
    const {questions, users, authedUser} = this.props
    const qid = this.state.qid
    const question = PoolFormat(questions, users, qid, authedUser)
  
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
          </Col>
        </Row>
      </Container>
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