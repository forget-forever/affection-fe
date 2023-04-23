
// eslint-disable-next-line import/no-commonjs
const { getOssUrl } = require('./utils/config')

const tabBar: ITabBar = {
  color: '#999',
  selectedColor: '#aaa',
  backgroundColor: '#333',
  list: [
    {
      selectedIconPath: 'assets/images/on-home.png',
      selectedIconUrl: getOssUrl('UI/home/home_on.png'),
      iconUrl: getOssUrl('UI/home/home.png'),
      iconPath: 'assets/images/home.png',
      pagePath: 'pages/index/index',
      text: '首页',
    },
    {
      iconPath: 'assets/images/planetary.png',
      selectedIconPath: 'assets/images/on-planetary.png',
      selectedIconUrl: getOssUrl('UI/home/planetary_on.png'),
      iconUrl: getOssUrl('UI/home/planetary.png'),
      pagePath: 'pages/planetary/index',
      text: '星球圈',
    },
    {
      iconPath: 'assets/images/my.png',
      selectedIconPath: 'assets/images/on-my.png',
      selectedIconUrl: getOssUrl('UI/home/my_on.png'),
      iconUrl: getOssUrl('UI/home/my.png'),
      pagePath: 'pages/my/index',
      text: '我的',
    },
  ],
}

// eslint-disable-next-line import/no-commonjs
module.exports = {
  tabBar,
}
