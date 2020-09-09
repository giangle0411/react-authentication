import { AUTH_USER, AUTH_ERROR } from './types'
import axios from 'axios'

// ReduxThunk allow returning different value type from action creator
// Get total control over the dispatch process inside action creator
// Can be object of a function
// If return a function -> Automatically called with a dispatch function

export const signup = (formProps) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3090/signup', formProps)
    dispatch({ type: AUTH_USER, payload: response.data.token })
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email is in use.' })
  }
}
