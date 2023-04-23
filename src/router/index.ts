import { actions, store } from "@/store";
import { navigateBack as taroNavigateBack, navigateTo, redirectTo, reLaunch, switchTab } from "@tarojs/taro";
import { bindTipNode } from "../utils";
import { serializeParams } from "../utils/utils";
import { IRouterMap, loginExcludeList, routerMap, RouterType } from "./routerMap";


type IConfig = {
  success?: (arg: Taro.General.CallbackResult) => void,
  fail?: (arg: Taro.General.CallbackResult) => void,
  complete?: (arg: Taro.General.CallbackResult) => void
}
type IParams<U extends keyof IRouterMap> = undefined extends IRouterMap[U] ? {params?: IRouterMap[U]} : {params: IRouterMap[U]}

/**
 * 页面跳转的函数
 * @param url 跳转的routeMap值，记得在routerMap中加好类型和跳转方案
 * @param config 其他的配置参数，包括success，fail，events什么的
 * @param straight 是不是跳过判定鉴权，直接跳转
 */
export const navigate = <U extends keyof IRouterMap, T extends RouterType = 'navigate'>(
  url: U,
  config?: IConfig & IParams<U> & {
    type?: T
    events?: T extends 'navigate' ? Record<string, any> | undefined : undefined
  },
  straight: boolean = false
) => {
  if (!straight && process.env.TARO_ENV !== 'h5' && !loginExcludeList.includes(url)) {
    const { token } = store.getState().common;
    if (!token?.val) {
      actions.modalOption({
        title: '绑定提醒',
        content: bindTipNode(() => {
          setTimeout(() => {
            navigate(url, config, true)
          }, 1500)
        }),
        hideButton: true,
        closeOnClickOverlay: false,
      });
      return ;
    }
  }

  const { type = 'navigate', events, success, fail, complete, params} = config || {}

  const querystring = serializeParams(params || {})
  const toUrl = querystring ? `${routerMap[url](type)}?${querystring}` : routerMap[url](type)
  const defaultData = { success, fail, complete, url: toUrl};

  switch(type) {
    case 'navigate':
      navigateTo({
        ...defaultData,
        events,
      })
    break;
    case 'reLaunch': 
      reLaunch({ ...defaultData })
    break;
    case 'redirect': 
      redirectTo({ ...defaultData })
    break;
    case 'switchTab':
      switchTab({ ...defaultData })
    break;
    default: 
      console.log(`是谁乱传type参数，传了个${type}`)
  }
}
/**
 * webview页面跳回小程序的界面
 * @param urlKey 跳转的routeMap值，记得在routerMap中加好类型和跳转方案
 */
export const h5Navigate = <U extends keyof IRouterMap>(urlKey: U, config?: IConfig & IParams<U>) => {
  const { success, fail, complete, params} = config || {}

  const querystring = serializeParams(params || {})
  const toUrl = querystring ? `${routerMap[urlKey]('navigate')}?${querystring}` : routerMap[urlKey]('navigate')
  // @ts-ignore
  const wxProgram = wx.miniProgram as Pick<typeof Taro, 'navigateTo' | 'navigateBack' | 'switchTab' | 'redirectTo'>
  wxProgram.navigateTo({
    url: toUrl,
    success,
    fail,
    complete
  })
}

export const navigateBack = (num = 1, config: IConfig = {}) => {
  const { success, fail, complete } = config;
  taroNavigateBack({
    delta: num,
    success,
    fail,
    complete
  });
}