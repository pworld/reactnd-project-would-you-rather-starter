import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'
import { sortTime } from '../utils/helpers'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER = 'ADD_ANSWER'
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER'
export const RECEIVE_QUESTIONS_ANSWERED = 'RECEIVE_QUESTIONS_ANSWERED'
export const RECEIVE_QUESTIONS_NOT_ANSWERED = 'RECEIVE_QUESTIONS_NOT_ANSWERED'

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

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function receiveQuestionsAnswered (answeredQuestions) {
  return {
    type: RECEIVE_QUESTIONS_ANSWERED,
    answeredQuestions,
  }
}

export function receiveQuestionsNotAnswered (questionsNotAnswered) {
  return {
    type: RECEIVE_QUESTIONS_NOT_ANSWERED,
    questionsNotAnswered,
  }
}

export function handleAddQuestion (optionOneText, optionTwoText, author) {
  return (dispatch, getState) => {
    const { questionsCategory } = getState()

    dispatch(showLoading())

    const info = {optionOneText, optionTwoText, author}

    return saveQuestion(info)
    .then((question) => {

      // Push to props answered and not answered category
      questionsCategory.unAnswered.push(question)
      sortTime(questionsCategory.answered)
      sortTime(questionsCategory.unAnswered)

      // Push to props Questions
      dispatch(addQuestion(question))
    }).then(() => dispatch(hideLoading()))
  }
}

export function handleAddAnswer (authedUser, qid, answer) {
  return (dispatch, getState) => {
    const { questionsCategory } = getState()

    dispatch(showLoading())

    const info = {authedUser, qid, answer}

    return saveQuestionAnswer(info)
      .then((res) => {
        // Push to props Questions and props User Answer
        dispatch(addAnswer(res))
        dispatch(addUserAnswer(res))

        // Push to props answered category
        const newQuestion = res.questions[qid]
        questionsCategory.answered.push(newQuestion)

        // Remove answered question from not answered category
        const questionsCategoryNA = questionsCategory.unAnswered.filter(qc => qc.id !== qid)
        questionsCategory.unAnswered = questionsCategoryNA

        sortTime(questionsCategory.answered)
        sortTime(questionsCategory.unAnswered)

        // Push to props Authenticated user
        const userLoggedin = res.users[authedUser]
        dispatch(setAuthedUser(userLoggedin))
        localStorage.setItem('loggedin',JSON.stringify(userLoggedin))
      })
      .then(() => dispatch(hideLoading()))
  }
}

export function handleAnsweredQuestion (authedUser, questions) {
  return (dispatch) => {
    // Get Category Answered
    const questionsAnswered = Object.values(questions).filter(question => {
      const myQuestion = Object.keys(authedUser.answers).filter(answer => { return answer === question.id})
      if(myQuestion.length > 0){
        return myQuestion[0] === question.id ? question : null
      }
      return null
    })
    // Get Category Not Answered
    const questionsNotAnswered = Object.values(questions).filter(x => !questionsAnswered.includes(x))

    dispatch(receiveQuestionsAnswered(sortTime(questionsAnswered)))
    dispatch(receiveQuestionsNotAnswered(sortTime(questionsNotAnswered)))
  }
}