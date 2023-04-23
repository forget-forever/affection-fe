// eslint-disable-next-line import/no-commonjs
const { tabBar } = require('./config')

const uniquePages = {
  h5: [ 'pages/h5pages/index/index'] as const,
  miniapp: [
    'pages/index/index',
    'pages/planetary/index'
  ] as const
};
const generalPages = [ 'pages/my/index' ] as const
const pages = (() => {
  switch(process.env.TARO_ENV) {
    case 'h5':
      return uniquePages.h5;
    default:
      return [...uniquePages.miniapp, ...generalPages];
  }
})()


export default {
  pages,
  subPackages: [
    {
      root: 'packages/index',
      pages: ['pages/post/index']
    },
    {
      root: 'packages/my',
      pages: ['pages/bindPhone/index',]
    }
  ] as const,
  window: {
    navigationStyle: "custom",
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#333',
    navigationBarTitleText: '情意盲盒',
    navigationBarTextStyle: 'white'
  },
  tabBar: tabBar,
}
