import {  RECEIVE_QUESTIONS_ANSWERED, 
          RECEIVE_QUESTIONS_NOT_ANSWERED, 
          ADD_QUESTIONS_NOT_ANSWERED, 
          ADD_QUESTIONS_ANSWERED } from '../actions/questions'

import {objArr} from '../utils/helpers'

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
        notAnswered: action.questionsNotAnswered
      }
    case ADD_QUESTIONS_NOT_ANSWERED :
      const { questionsNotAnswered } = action

        return {
          ...state,
          answered:{
            ...state.answered
          },
          notAnswered:{
            ...state.notAnswered,
            [questionsNotAnswered.id]:{
              ...state.notAnswered[questionsNotAnswered.id],
              ...questionsNotAnswered
            }
          }
        }
    case ADD_QUESTIONS_ANSWERED :
      const { answeredQuestions, qid } = action
      const newAnsweredQuestions = answeredQuestions[qid]

        return {
          ...state,
          answered:{
            ...state.answered,
            [newAnsweredQuestions.id]:{
              ...state.notAnswered[newAnsweredQuestions.id],
              ...newAnsweredQuestions
            }
          },
          notAnswered:objArr(Object.values(state.notAnswered).filter(item => (item.id !== qid)))
        }
    default :
      return state
  }
}