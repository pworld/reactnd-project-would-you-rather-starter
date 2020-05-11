import React, { Component } from 'react'
import {Container, Row, Button, Col} from 'react-bootstrap';
import { connect } from 'react-redux'
import { getUser } from '../../utils/helpers'

class Questions extends Component {
  handleClick(e, id) {
    e.stopPropagation();
    this.props.history.push(`/question/${id}`)
  }

  render() {
    
    const {questionAnswered, users} = this.props
    const userDetail = getUser(questionAnswered.author, users)

    const getTextAnswerPool = questionAnswered.optionOne.votes.filter(qa => qa === questionAnswered.author).length > 0 ?
      questionAnswered.optionOne.text : questionAnswered.optionTwo.text

    return (
      <Container>
        <Row className="justify-content-md-center app-container-list-home">
          <Col md={{ span: 3}} className="app-container-list-avatar">
            <img
              src={`https://robohash.org/${userDetail.id}`}
              alt={`${userDetail.name}`}
              className='avatar'
            />
          </Col>
          <Col md={{ span: 9}} className="app-container-list-content">
            <div className="app-container-component">
              <p className="justify-content-md-center">{userDetail.name} asks, Would You Rather:</p>
              <p>{getTextAnswerPool}</p>
              <Button variant="primary" onClick={(e) => this.handleClick(e, questionAnswered.id)}>View Pool</Button>
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