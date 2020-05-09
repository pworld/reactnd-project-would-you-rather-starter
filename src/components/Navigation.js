import React, {Component} from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {Nav} from 'react-bootstrap';

import { stateLogin } from '../actions/authedUser'

class Navigation extends Component {

  handleClick(e) {
    e.preventDefault()

    this.props.dispatch(stateLogin(null))
    localStorage.clear()
    this.props.history.push('/')
  }

  render() {

    const {authedUser} = this.props

    return (
    <Nav className='nav'>
      <ul className="navbar-nav">
        <li><NavLink to='/' exact activeClassName='active'>Home</NavLink></li>
        <li><NavLink to='/add' >New Questions</NavLink></li>
        <li><NavLink to='/leaderboard' >Leaderboard</NavLink></li>
      </ul>
      <ul className="navbar-nav flex-row-reverse">
        <li><span>Welcome, {authedUser.name}</span></li>
        <li><a href='/' onClick={(e) => this.handleClick(e)}>Signout</a></li>
      </ul>
    </Nav>
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