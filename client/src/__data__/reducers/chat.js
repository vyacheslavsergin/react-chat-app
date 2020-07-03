import {
  SET_CHAT_USER,
  SET_CHAT_USERS
} from '../action-types'

const initialState = {
  user: null,
  users: []
}

const handlers = {
  [SET_CHAT_USER]: (state, { user }) => ({ ...state, user: user }),
  [SET_CHAT_USERS]: (state, { users }) => ({ ...state, users: users }),
  DEFAULT: (state) => state
}

export default (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action)
}
