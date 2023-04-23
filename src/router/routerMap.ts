import app from '../app.config';

declare type NumberList = 0 | 1

type SubPackages = typeof app['subPackages']
// type SubPackageItem = SubPackages[number];
// type SubPackagesVal = `${SubPackageItem['root']}/${ValueOf<SubPackageItem['pages']>}`;
type SubPackagesList = {
  [K in NumberList]: `${SubPackages[K]['root']}/${ValueOf<SubPackages[K]['pages']>}`
}

export type IPageList = ValueOf<(typeof app)['pages']> | ValueOf<SubPackagesList>

export type RouterType = 'switchTab' | 'navigate' | 'reLaunch' | 'redirect'

// 暂时以Record<string, string>的形式传参,因为参数是要拼接在path后面
export type IRouterMap = {
  my: never;
  index: never;
  postMsg: never;
  bindPhoneNumber?: { needWxBind?: string};
  planetary: never;
}
// 可以不用登陆就能进的页面
export const loginExcludeList: (keyof IRouterMap)[] = ['index', 'my', 'planetary', 'bindPhoneNumber']
export const routerMap: Record<keyof IRouterMap, (type: RouterType ) => `/${IPageList}`> = {
  my: (_type) => '/pages/my/index',
  index: (_type) => '/pages/index/index',
  postMsg: (_type) => '/packages/index/pages/post/index',
  bindPhoneNumber: (_type) => '/packages/my/pages/bindPhone/index',
  planetary: (_type) => '/pages/planetary/index'
}