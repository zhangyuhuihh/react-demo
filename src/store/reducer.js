/**
 * Created by 叶子 on 2017/7/30.
 */
import { combineReducers } from 'redux'

const authReducer = (authArr = [], action) => {
  switch (action.type) {
    case 'SET_AUTHARR':
      return action.authArr
    default:
      return []
  }
}

const allReducers = combineReducers({
  authArr: authReducer
})

export default allReducers