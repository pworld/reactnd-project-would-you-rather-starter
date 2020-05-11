import {  RECEIVE_QUESTIONS_ANSWERED, 
          RECEIVE_QUESTIONS_NOT_ANSWERED } from '../actions/questions'

export default function questionsCategory (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS_ANSWERED :
      return {
        ...state,
        answered: action.answeredQuestions
      }
    case RECEIVE_QUESTIONS_NOT_ANSWERED :
      return {
        ...state,
        unAnswered: action.questionsNotAnswered
      }

    default :
      return state
  }
}