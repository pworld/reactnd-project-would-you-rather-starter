import React, {Component} from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { stateLogin } from '../actions/authedUser'

class Nav extends Component {

  handleClick(e) {
    e.preventDefault()

    this.props.dispatch(stateLogin(null))
    localStorage.clear()
    this.props.history.push('/')
  }

  render() {
    return (
    <nav className='nav'>
      <ul>
        <li><NavLink to='/' exact activeClassName='active'>Home</NavLink></li>
        <li><NavLink to='/' onClick={(e) => this.handleClick(e)}>Signout</NavLink></li>
      </ul>
    </nav>
    )
  }
}

export default connect()(Nav)