export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER = 'ADD_USER'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function addUser (user) {
  return {
    type: ADD_USER,
    user,
  }
}