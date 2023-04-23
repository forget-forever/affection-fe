import Taro from '@tarojs/taro';
import { parse } from 'querystring';

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/**
 * [serializeParams 序列化object为http get 参数]
 * @param  {[object]} obj [params object]
 * @return {[string]}     [string]
 */
export function serializeParams(obj?: Record<string, string>) {
  let str = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(obj || {})) {
    str += `&${key}=${value}`;
  }
  return str;
}

/**
 * [formatOptions 将常量对象处理成 options]
 */
export function formatOptions(obj: Record<string, string>): IOptions[] {
  const result = Object.entries(obj).map(([k, v]) => ({ value: k, label: v }));
  return result;
}

/**
 * 过滤值为空的对象 or 数组
 * @param obj
 */
const toType = (target: string | Record<string, string> | []) =>
  ({}.toString.call(target).toLowerCase());
// eslint-disable-next-line @typescript-eslint/ban-types
export const filterNull = (o: {}) => {
  const temp = { ...o };
  if (temp instanceof Object) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in temp) {
      if (temp.hasOwnProperty(key)) {
        if (temp[key] == null) delete temp[key];
        if (toType(temp[key]) === '[object string]') {
          temp[key] = temp[key].trim();
          if (temp[key] === '') delete temp[key];
        } else if (toType(temp[key]) === '[object object]') {
          temp[key] = filterNull(temp[key]);
          if (JSON.stringify(temp[key]) === '{}') delete temp[key];
        } else if (toType(temp[key]) === '[object array]') {
          temp[key] = filterNull(temp[key]);
          temp[key] = temp[key].filter((item: string | Record<string, string> | []) => item);
          if (temp[key].length === 0) delete temp[key];
        }
      }
    }
  }
  return temp;
};

/**
 * 校验是否是数字(包括小数)
 * @param val
 */
export const numberRegex = (val: string): boolean => {
  return /^[0-9]*\.?[0-9]*$/.test(val);
};

/**
 * 校验是否是正数
 * @param val
 */
export const positiveNumberRegex = (val: string): boolean => {
  return /^[0-9]*$/.test(val);
};

/**
 * 获取样式显隐
 * @param param 是或否的表达式，会自动转boolean
 * @returns { style: { display: '' 或者 'none' } }
 */
export const getVisible = (param?: string | number | boolean) => {
  return { style: { display: param ? '' : 'none' } };
}

/**
 * 筛选字符串的，判断某一个字符串数组中是否有匹配的，比如说source: ‘abcde’可以被vals: ['a', 'g']匹配到返回true，因为有a。
 * @param vals 判断的数组
 * @param source 要校验的字符串
 * @returns 是否有
 */
export const dataFilter = (vals: string[], source: string) => {
  return vals.some((ele) => source.toLowerCase().indexOf(ele.toLowerCase()) >= 0);
};

/** 展示全局的 toast 提示 */
export const showMaskToast = (title: string, icon: Taro.showToast.Option['icon'] = 'none', duration = 1500) =>
  new Promise<void>((resolve) => {
    Taro.showToast({
      title,
      icon,
      duration,
      mask: true,
    });
    setTimeout(() => {
      resolve();
    }, duration);
  });

/**
 * 对象大驼峰命名转小驼峰命名
 * @param data 需要转的对象
 * @returns 转完后的样子
 */
export const toSmallCamel = <T extends IDataObject>(data: T): ISmallCamel<T> => {
  if (typeof data != 'object' || !data) return data  
  if (Array.isArray(data)) {
    // @ts-ignore
    return data.map(item => toSmallCamel(item))
  }
  const newData = {}
  for (let key in data) {
    let newKey = key.replace(key[0], key[0].toLowerCase())
    // @ts-ignore
    newData[newKey] = toSmallCamel(data[key])
  }
  // @ts-ignore
  return newData
}

/**
 * 小驼峰对象转大驼峰
 * @param data 需要转的对象
 * @returns 转完之后的对象
 */
export const toBigCamel = <T extends IDataObject>(data: T): IBigCamel<T> => {
  if (typeof data != 'object' || !data) return data
  if (Array.isArray(data)) {
    // @ts-ignore
    return data.map(item => toBigCamel(item))
  }
  
  const newData = {}
  for (let key in data) {
    let newKey = key.replace(key[0], key[0].toUpperCase())
    // @ts-ignore
    newData[newKey] = toBigCamel(data[key])
  }
  // @ts-ignore
  return newData
}

/**
 * 获取指定区间的随机数
 * @param minNum 最小数
 * @param maxNum 最大数
 * @returns 
 */
export const getRandom = (minNum: number, maxNum: number) => {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum + '', 10); 
}

/**
 * 对数据进行类型守卫的函数
 * @param data 守卫的数据
 * @param cb 判断守卫的函数，把能够确定的逻辑写进来，返回true就是确定这个类型
 * @returns 第二个参数返回true为这个类型，否则不是
 */
 export const projectType = <T extends U, U = unknown>(data: U, cb: (arg: U) => boolean): data is T => {
  return cb(data);
};

export const setLocalStorage = <K extends keyof IStorage>(key: K, data: IStorage[K]) => {
  Taro.setStorageSync(key, data)
}
export const getLocalStorage = <K extends keyof IStorage>(key: K) => {
  return Taro.getStorageSync<IStorage[K]>(key)
}

