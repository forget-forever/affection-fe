import { store } from "@/store";
import { General, request as taroRequest } from "@tarojs/taro";
import { rootBase } from "../../config/proxy";
import { filterNull, showMaskToast, toBigCamel, toSmallCamel } from "./utils";

const codeMessage = {
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// 只有h5的网页需要代理
const rootUrl = process.env.TARO_ENV === 'h5' ? '' : rootBase;

/**
 * 异常处理程序
 */
const errorHandler = (err: Taro.request.SuccessCallbackResult<IResponseData<unknown>>) => {
  const { data, statusCode } = err
  if (statusCode) {
    const errorText = data.message || codeMessage[statusCode];
    return Promise.reject(new Error(errorText));
  }
  return Promise.reject(new Error('网络异常'));
};

/**
 * 自己handle的错误
 */
// @ts-ignore
const errorHandlerSelf = (err: ISmallCamel<Taro.request.SuccessCallbackResult<IResponseData<unknown>>['data']>) => {
  switch (+err.code) {
    case 10000:
      showMaskToast('未登录')
      return Promise.reject(new Error('未登录'));
    case 10001:
    showMaskToast('访问频繁')
      return Promise.reject(new Error('访问频繁'));
    case 10002:
    showMaskToast(err.message)
      return Promise.reject(new Error(err.message));
    default:
  }
  return Promise.reject(err);
}

// type ICamelType = 'big' | 'small'
/**
 * 配置request请求时的默认参数
 */
type IResponseData<T = any> = {
  isSuccess: boolean;
  message: string;
  code: number;
  data: T
};
type IOptions = {
  method?: keyof Taro.request.method;
  data?: IValue
  header?: General.IAnyObject;
  paramsToBigCamel?: boolean
}
/**
 * 对接口的返回值进行二次的封装
 * */
export const request = async <T extends IValue = any, E = {}>(url: string, options: IOptions = {}) => {
  const { paramsToBigCamel = true, data: params } = options;
  let requestUrl = url.trim();
  if (!/^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-\(\)]*[\w@?^=%&/~+#-\(\)])?$/.test(requestUrl)) {
    requestUrl = `${rootUrl}${requestUrl}`
  }
  const { common: { token } } = store.getState()
  try {
    const res = await taroRequest<IResponseData<T> & E>({
      url: requestUrl,
      method: options?.method || 'GET',
      // @ts-ignore
      data: filterNull(paramsToBigCamel ? toBigCamel(params || {}) : params),
      header: filterNull({
        ...options?.header,
        Token: token?.val,
        Cookie: `p_token=${token?.val}`
      }),
    });
    const {data, statusCode} = res;
    const resData = toSmallCamel(data);
    if(+statusCode <= 300 || +statusCode === 304) {
      if (resData.isSuccess || +resData.code === 0) {
        return resData
      } else {
        return errorHandlerSelf(resData)
      }
    } else {
      return errorHandler(res)
    }
  } catch (error) {
    showMaskToast('网络异常')
    return Promise.reject(new Error('网络异常'))
  }
};

// export const requestSmallCamel = () => {

// }
// export default request;
