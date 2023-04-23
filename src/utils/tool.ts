export function isNumberValidate(number?: string){
  if(!number){
    return false;
  }
  return /^tc\d{3,8}$/.test(String(number).trim());
}

export const parser = (s: string | undefined)=>(s && parseInt(s, 10) || 0);

/**
 * 去除对象中所有符合条件的对象
 * @param {Object} obj 来源对象
 * @param {Function} fn 函数验证每个字段
 */
 export const compactObj = (obj: IDataObject, fn = isEmpty) => {
  for (var i in obj) {
    if (typeof obj[i] === 'object') {
      // @ts-ignore
      compactObj(obj[i], fn)
    }
    // @ts-ignore
    if (fn(obj[i])) {
      delete obj[i]
    }
  }
}

// 删除空对象 删除'', null, undefined
const isEmpty = (foo: string | number | boolean) => (foo === null || foo === undefined)

export const isPhone = (val: string) => {
  try {
    return /^(?:(?:\+|00)86)?1\d{10}$/.test(val)
  } catch (error) {
    return false
  }
}

