import {  RECEIVE_QUESTIONS_ANSWERED, 
          RECEIVE_QUESTIONS_NOT_ANSWERED,
          ADD_QUESTIONS_CATEGORY } from '../actions/questions'

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

    case ADD_QUESTIONS_CATEGORY :
      return {
        ...state,
      }

    default :
      return state
  }
}