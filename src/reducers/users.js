import { RECEIVE_USERS } from '../actions/users'
import { ADD_USER_ANSWER} from '../actions/questions'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case ADD_USER_ANSWER :
      return {
        ...state,
        ...action.users
      }
    default :
      return state
  }
}