import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER = 'ADD_ANSWER'
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER'

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

function addAnswer (res) {
  const questions = res.questions
  return {
    type: ADD_ANSWER,
    questions
  }
}

function addUserAnswer (res) {
  const users = res.users
  return {
    type: ADD_USER_ANSWER,
    users
  }
}

function resAnswer (res, authedUser, dispatch) {
  dispatch(addAnswer(res))
  dispatch(addUserAnswer(res))

  const userLoggedin = res.users[authedUser]
  dispatch(setAuthedUser(userLoggedin))
  localStorage.setItem('loggedin',JSON.stringify(userLoggedin))
}

export function handleAddQuestion (optionOneText, optionTwoText, author) {
  return (dispatch) => {

    dispatch(showLoading())

    const info = {optionOneText, optionTwoText, author}

    return saveQuestion(info)
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

export function handleAddAnswer (authedUser, qid, answer) {
  return (dispatch) => {

    dispatch(showLoading())

    const info = {authedUser, qid, answer}

    return saveQuestionAnswer(info)
      .then((res) => resAnswer(res, authedUser, dispatch))
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}
