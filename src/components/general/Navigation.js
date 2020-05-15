import React, {Component} from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import {Nav} from 'react-bootstrap';

import { signout } from '../../actions/authedUser'

class Navigation extends Component {

  handleClick(e) {
    e.preventDefault()

    this.props.dispatch(signout(null))
    return <Redirect to='/login' />
  }

  render() {

    const {authedUser} = this.props

    let menu = null
    if(authedUser !== null ){
      menu = (
        <Nav className='nav'>
          <ul className="navbar-nav">
            <li><NavLink to='/' exact activeClassName='active'>Home</NavLink></li>
            <li><NavLink to='/add' >New Questions</NavLink></li>
            <li><NavLink to='/leaderboard' >Leaderboard</NavLink></li>
          </ul>
          <ul className="navbar-nav">
            <li><span>Welcome, {authedUser.name}</span></li>
            <li><a href='/' onClick={(e) => this.handleClick(e)}>Signout</a></li>
          </ul>
        </Nav>
      )
    }

    return (
      <div>
        {menu}
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    authedUser: authedUser,
    users: users
  }
}

export default connect(mapStateToProps)(Navigation)