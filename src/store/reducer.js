/**
 * Created by 叶子 on 2017/7/30.
 */
import { combineReducers } from 'redux'

const countReducer = (count = 0, action) => {
  switch (action.type) {
    case 'TEST_REDUX':
      return count + 1
    default:
      return count
  }
}

const allReducers = combineReducers({
  count: countReducer
}) 

export default allReducers