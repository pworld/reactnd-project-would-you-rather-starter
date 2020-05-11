import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions, handleAnsweredQuestion } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_USER = JSON.parse(localStorage.getItem('loggedin'))

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(setAuthedUser(AUTHED_USER))
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        if(AUTHED_USER) dispatch(handleAnsweredQuestion(AUTHED_USER, questions))
        dispatch(hideLoading())
      })
  }
}