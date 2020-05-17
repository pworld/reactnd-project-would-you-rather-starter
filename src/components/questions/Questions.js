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
    
    const {questionAnswered, users } = this.props

    const userDetail = getUser(questionAnswered.author, users)
    const answer = typeof this.props.authedUser.answers[questionAnswered.id] !== 'undefined' ? 
                    this.props.authedUser.answers[questionAnswered.id] : 'optionOne'

    const getTextAnswerPool = questionAnswered[answer].text

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
              <label className="form-label">{userDetail.name} asks, Would You Rather:</label>
              <p className="content">{getTextAnswerPool}</p>
              <Button variant="primary" onClick={(e) => this.handleClick(e, questionAnswered.id)}>View Pool</Button>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

function mapStateToProps ({ users, authedUser }) {
  return {
    users,
    authedUser
  }
}

export default connect(mapStateToProps)(Questions)