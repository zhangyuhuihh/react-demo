const SET_AUTHARR = 'SET_AUTHARR'

// 由于action可能公用，所以在这里拿出来,方便其他地方调用
export const setAuthArr = arr => ({ type: SET_AUTHARR, authArr: arr })
