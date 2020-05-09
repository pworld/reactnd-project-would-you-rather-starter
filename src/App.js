import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import {Container, Row, Col} from 'react-bootstrap';

import { handleInitialData } from './actions/shared'
import Navigation from "./components/Navigation"
import Login from "./components/Login"
import Home from "./components/Home"
import NewQuestion from "./components/NewQuestion"
import QuestionAnswer from "./components/QuestionAnswer"

// mindahin Nav
// answer not answer sorting time
// mindahin ke reducer
// fixing layout
// create kasih notifikasi
// login ga diisi belum kehandle

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  // Redirect is user logged in
  renderRedirect = () => {
    const isLogin = localStorage.getItem('loggedin')
    if (isLogin !== null) {
      return <Redirect to='/' />
    }else{
      return <Redirect to='/login' />
    }
  }

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
          <Route exact path='/leaderboard' component={Home} />
          <Route exact path='/question/:id' component={QuestionAnswer} />
        </div>
      )
    }else{
      menu = (
        <div className='container'>
          <Route path='/login' render={({ history }) => ( <Login history={history} /> )} />
        </div>
      )
    }

    return (
      <Router>
        {this.renderRedirect()}
        <Fragment>
          <LoadingBar />
          <Container>
            <Row className="justify-content-md-center">
              <Col md={{ span: 10, offset: 1 }}><h3 className='center'>Woud You Rather?</h3></Col>
            </Row>
            <Row>
              <Col md={{ span: 10, offset: 1 }}>{menu}</Col>
            </Row>
          </Container>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser: authedUser
  }
}

export default connect(mapStateToProps)(App)
