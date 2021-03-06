import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'

import { handleInitialData } from './actions/shared'
import AppComponent from "./components/AppComponent"


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  // Redirect is user logged in
  renderRedirect = () => {
    const isLogin = this.props.authedUser
    if (isLogin === null) {
      return <Redirect to='/login' />
    }
  }

  render() {
    return (
      <Router>
        {this.renderRedirect()}
        <Fragment>
          <LoadingBar />
            <AppComponent />
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser  }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App)