import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER = 'ADD_ANSWER'
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER'
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION'
export const SET_AUTHED_QUESTION = 'SET_AUTHED_QUESTION'

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

function addUserQuestion (question) {
  return {
    type: ADD_USER_QUESTION,
    question
  }
}

function setAuthedQuestion (question) {
  return {
    type: SET_AUTHED_QUESTION,
    question
  }
}


export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function handleAddQuestion (optionOneText, optionTwoText, author) {
  return (dispatch) => {

    dispatch(showLoading())

    const info = {optionOneText, optionTwoText, author}

    return saveQuestion(info)
    .then((question) => {

      // Push to props Questions
      dispatch(addQuestion(question))
      dispatch(addUserQuestion(question))
      dispatch(setAuthedQuestion(question))

    }).then(() => dispatch(hideLoading()))
  }
}

export function handleAddAnswer (authedUser, qid, answer) {
  return (dispatch, getState) => {

    dispatch(showLoading())

    const info = {authedUser, qid, answer}

    return saveQuestionAnswer(info)
      .then((res) => {
        // Push to props Questions and props User Answer
        dispatch(addAnswer(res))
        dispatch(addUserAnswer(res))

        // Push to props Authenticated user
        const userLoggedin = res.users[authedUser.id]
        dispatch(setAuthedUser(userLoggedin))
      })
      .then(() => dispatch(hideLoading()))
  }
}
