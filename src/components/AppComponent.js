import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap';

import Navigation from "./general/Navigation"
import Login from "./general/Login"
import Home from "./general/Home"
import InvalidURL from "./general/invalidUrl"
import Register from "./general/Register"
import NewQuestion from "./questions/NewQuestion"
import QuestionAnswer from "./questions/QuestionAnswer"
import Pool from "./questions/Pool"
import Leaderboard from "./leaderboard/Leaderboard"

class AppComponent extends Component {

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col><h3 className='center'>Woud You Rather?</h3></Col>
        </Row>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
          <Navigation />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact default path='/' component={Home} />
            <Route exact path='/add' component={NewQuestion} />
            <Route exact path='/leaderboard' component={Leaderboard} />
            <Route exact path='/question/:id' component={QuestionAnswer} />
            <Route exact path='/questions/:question_id' component={Pool} />
            <Route path="*" component={InvalidURL} />
          </Switch>
          </Col>
        </Row>
    </Container>
    )
  }
}

export default AppComponent
