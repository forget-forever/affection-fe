import { Component } from 'react';
import { AtTabBar }  from 'taro-ui';
import { TabItem } from 'taro-ui/types/tab-bar';
import styles from './index.module.scss';

// eslint-disable-next-line import/no-commonjs
const { tabBar } = require('../../config');

interface TabBar {
  state: {
    current: number;
    tabList: TabItem[];
  }
}
class TabBar extends Component {
  constructor (props: {}) {
    super(props)
    this.state = {
      current: 0,
      tabList: (tabBar as ITabBar).list.map((item) => ({
        title: item.text,
        image: item.iconUrl,
        selectedImage: item.selectedIconUrl
      }))
    }
  }
  handleClick = (index: number) => {
    this.setState({
      current: index
    })
  }
  render () {
    const { tabList } = this.state;
    return (
      <AtTabBar
        className={styles.tabbarContainer}
        tabList={tabList}
        onClick={this.handleClick}
        current={this.state.current}
        fixed
      />
    )
  }
}

export default TabBar;
