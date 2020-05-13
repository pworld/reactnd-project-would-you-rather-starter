import { handleAnsweredQuestion } from './questions'
import { addUser } from './users'
import { saveUser } from '../utils/api'
import { userFormat } from '../utils/helpers'

export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser (user) {
  return {
    type: SET_AUTHED_USER,
    user,
  }
}

export function stateLogin (users, user, password, questions) {
  return (dispatch) => {
    let success = false
    const selectedUser = Object.values(users).filter(u => u.id === user && u.password === password)

    if(selectedUser.length > 0){
      success = true
      dispatch(setAuthedUser(selectedUser[0]))
      dispatch(handleAnsweredQuestion(selectedUser[0], questions))
      localStorage.setItem('loggedin',JSON.stringify(user))
    }
    return success
  }
}

export function signout (value) {
  return (dispatch) => {
    localStorage.removeItem('loggedin')
    dispatch(setAuthedUser(value))
  }
}

export function register (name, password, questions) {
  return (dispatch) => {
    const user = userFormat(name, password)
    saveUser(user)
    dispatch(addUser(user))
  }
}