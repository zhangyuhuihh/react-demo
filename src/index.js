import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './assets/styles/andtEdit/gloable_edit.scss';
import App from './App'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'

import { Provider } from 'react-redux'
import store from './store'

import * as serviceWorker from './serviceWorker'

import './icons'

ReactDOM.render(
  <LocaleProvider locale={zh_CN}>
    <Provider store={store}>
      <App />
    </Provider>
  </LocaleProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
