import { RECEIVE_USERS, ADD_USER } from '../actions/users'
import { ADD_USER_ANSWER, ADD_USER_QUESTION } from '../actions/questions'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case ADD_USER :
      const {user} = action
      return {
        ...state,
        ...user
      }
    case ADD_USER_ANSWER :
      return {
        ...state,
        ...action.users
      }
    case ADD_USER_QUESTION :
      return {
        ...state,
        ...action.question
      }
    default :
      return state
  }
}