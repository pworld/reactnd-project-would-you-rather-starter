import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Navigation from "./general/Navigation"
import Login from "./general/Login"
import Home from "./general/Home"
import InvalidURL from "./general/invalidUrl"
import Register from "./general/Register"
import NewQuestion from "./questions/NewQuestion"
import QuestionAnswer from "./questions/QuestionAnswer"
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
            <PrivateRoute exact path='/' component={Home} authedUser={ this.props.authedUser} />
            <PrivateRoute exact path='/add' component={NewQuestion} authedUser={ this.props.authedUser} />
            <PrivateRoute exact path='/leaderboard' component={Leaderboard} authedUser={ this.props.authedUser} />
            <PrivateRoute  path='/questions/:id' component={QuestionAnswer} authedUser={ this.props.authedUser} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route path="/404" component={InvalidURL} />
          </Switch>
          </Col>
        </Row>
    </Container>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(AppComponent)

//- private route
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
    {...rest}
    render={(props) => (
        rest.authedUser
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: { from: rest.location }}}/>
    )}
    />
  )
}