import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'

import { handleInitialData } from './actions/shared'
import Nav from "./components/nav"
import Login from "./components/login"
import Home from "./components/home"

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  renderRedirect = () => {
    const isLogin = localStorage.getItem('loggedin')
    if (isLogin !== null) {
      return <Redirect to='/' />
    }else{
      return <Redirect to='/login' />
    }
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>

            { !this.props.authedUser ? 
              <Route render={({ history }) => ( <Nav history={history} /> )} /> : null }

            <Route path='/login' render={({ history }) => ( <Login history={history} /> )} />
            <Route exact path='/' component={Home} />

            {this.renderRedirect()}

          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
