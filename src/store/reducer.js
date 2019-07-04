/**
 * Created by 叶子 on 2017/7/30.
 */
// import { combineReducers } from 'redux'

const changeValue = (state = { count: 1}, action) => {
  switch (action.type) {
    case 'TEST_REDUX':
      return {
        ...state,
        count: state.count + 1
      }
    default:
      return { ...state }
  }
}

export default changeValue
