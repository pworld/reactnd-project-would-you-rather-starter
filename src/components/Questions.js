import React, { Component } from 'react'
import {Container, Row, Button, Col} from 'react-bootstrap';
import { connect } from 'react-redux'
import { getUser } from '../utils/helpers'

class Questions extends Component {
  render() {
    
    const {questionAnswered, users} = this.props
    const userDetail = getUser(questionAnswered.author, users)

    const getTextAnswerPool = questionAnswered.optionOne.votes.filter(qa => qa === questionAnswered.author) ?
      questionAnswered.optionOne.text : questionAnswered.optionTwo.text

    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md={{ span: 3}} className="app-container-list">
            <img
              src={`https://robohash.org/${questionAnswered.id}`}
              alt={`${userDetail.name}`}
              className='avatar'
            />
          </Col>
          <Col md={{ span: 9}} className="app-container-list">
            <span>{userDetail.name} asks:</span>
            <div className="app-container-component">
              <p className="justify-content-md-center">Would You Rather:</p>
              <p>{getTextAnswerPool}</p>
              <Button variant="primary" type='submit'>View Pool</Button>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    users
  }
}

export default connect(mapStateToProps)(Questions)