const SET_AUTHARR = 'SET_AUTHARR'
const ADD_VISITIEDVIEWS = 'ADD_VISITIEDVIEWS'
const REMOVE_VISITIEDVIEWS = 'REMOVE_VISITIEDVIEWS'
// 由于action可能公用，所以在这里拿出来,方便其他地方调用
export const setAuthArr = arr => ({ type: SET_AUTHARR, authArr: arr })

export const addVisitiedViews = o => ({
  type: ADD_VISITIEDVIEWS,
  visitedObj: o
})

export const removeVisitiedViews = o => ({
  type: REMOVE_VISITIEDVIEWS,
  visitedObj: o
})