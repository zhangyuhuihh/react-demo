import { createStore } from 'redux'
import changeValue from './reducer'

const store = createStore(changeValue)

export default store
