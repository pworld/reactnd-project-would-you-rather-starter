import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import {Container, Row, Col} from 'react-bootstrap';

import Navigation from "./general/Navigation"
import Login from "./general/Login"
import Home from "./general/Home"
import Register from "./general/Register"
import NewQuestion from "./questions/NewQuestion"
import QuestionAnswer from "./questions/QuestionAnswer"
import Pool from "./questions/Pool"
import Leaderboard from "./leaderboard/Leaderboard"

class AppComponent extends Component {

  render() {
    const {authedUser} = this.props
    let menu = null

    // Logged in menu validations
    if(authedUser !== null ){
      menu = (
        <div className='container'>
          <Route render={({ history }) => ( <Navigation history={history} /> )} /> 
          <Route exact path='/' component={Home} />
          <Route exact path='/add' component={NewQuestion} />
          <Route exact path='/leaderboard' component={Leaderboard} />
          <Route exact path='/question/:id' component={QuestionAnswer} />
          <Route exact path='/pool/:id' component={Pool} />
        </div>
      )
    }else{
      menu = (
        <div className='container'>
          <Route path='/login' render={({ history }) => ( <Login history={history} /> )} />
          <Route exact path='/register' component={Register} />
        </div>
      )
    }

    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col><h3 className='center'>Woud You Rather?</h3></Col>
        </Row>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            {menu}
            <Route exact path='/no-match' component={Register} />  
          </Col>
        </Row>
    </Container>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser: authedUser
  }
}

export default connect(mapStateToProps)(AppComponent)
