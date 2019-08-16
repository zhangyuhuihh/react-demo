import { combineReducers } from 'redux'

const authReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_AUTHARR':
      return action.authArr
    default:
      return state
  }
}

const visitedViewsReducer = (
  state = [
    {
      routeName: '首页',
      path: '/Dashboard'
    }
  ] /** 这里的值就是对应的下面的想要的key的初始值,具体参考官网*/,
  action
) => {
  switch (action.type) {
    case 'ADD_VISITIEDVIEWS':
      const isHave = state.some(v => v.path === action.visitedObj.path)
      if (!isHave) {
        return state.concat(action.visitedObj)
      } else {
        return state
      }
    // return state.concat(action.visitedObj)
    case 'REMOVE_VISITIEDVIEWS':
      return state.filter(v => v.path !== action.visitedObj.path)
    default:
      return state
  }
}

const allReducers = combineReducers({
  // 这边authArr才是最终的state的key
  authArr: authReducer,
  visitiedViews: visitedViewsReducer
})

export default allReducers
