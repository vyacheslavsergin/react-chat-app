import {
  SET_CHAT_USER,
  SET_CHAT_USERS
} from '../action-types'

export const setChatUser = (user) => {
  return {
    type: SET_CHAT_USER,
    user
  }
}

export const setChatUsers = (users) => {
  return {
    type: SET_CHAT_USERS,
    users
  }
}
