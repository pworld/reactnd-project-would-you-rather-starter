import { SET_AUTHED_USER } from '../actions/authedUser'
import { SET_AUTHED_QUESTION } from '../actions/questions'

export default function authedUser (state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER :
      return action.user

    case SET_AUTHED_QUESTION:
      const {question} = action
      return {
        ...state,
        questions: state.questions.concat([question.id])
      }

    default :
      return state
  }
}