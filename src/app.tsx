import { Component } from 'react'
import { Provider } from 'react-redux'
import dayjs from 'dayjs';
import { hideTabBar } from '@tarojs/taro';
import './app.scss'
import './assets/style/app.css';
import './assets/style/animation.css';
import { store } from './store'
import { initLogin } from './utils/init';

class App extends Component {

  componentDidMount () {}

  onLaunch () {
    hideTabBar()
    if (process.env.TARO_ENV !== 'h5') {
      const { token } = store.getState().common;
      if (+dayjs().unix() - (token?.time || 0) >  60 * 60 * 3) {
        initLogin()
      }
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return <Provider store={store}>
      {this.props.children}
    </Provider>
  }
}

export default App
