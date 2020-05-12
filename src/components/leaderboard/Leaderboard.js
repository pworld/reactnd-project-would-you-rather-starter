import React, { Component } from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux'
import { leaderboardsFormat } from '../../utils/helpers'

class Leaderboard extends Component {
  render() {
    
    const {users} = this.props
    const leaderboards = leaderboardsFormat(users)

    return (
      <Container>

        {leaderboards && leaderboards.map((leaderboard) => (

          <Row className="justify-content-md-center" key={leaderboard.id}>
            <Col md={{ span: 3}} className="app-container-list">
              <img
                src={`https://robohash.org/${leaderboard.id}`}
                alt={`${leaderboard.name}`}
                className='avatar'
              />
            </Col>
            <Col md={{ span: 6}} className="app-container-list">
              <label class="form-label title">{leaderboard.name} asks:</label>
              <div className="app-container-component">
                <p className="justify-content-md-center">Answeres Questions: {leaderboard.answeredQuestion}</p>
                <p className="justify-content-md-center">Created Questions: {leaderboard.createdQuestion}</p>
              </div>
            </Col>
            <Col md={{ span: 3}} className="app-container-list">
              <p className="justify-content-md-center">Total Score:</p>
              <p className="app-container-score">{leaderboard.total}</p>
            </Col>
          </Row>

        ))}
      </Container>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    users
  }
}

export default connect(mapStateToProps)(Leaderboard)