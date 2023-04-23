/**
 * 节流
 * @param func {function}  需要调用的函数
 * @param wait {number}  规定的时间，单位毫秒
 * @returns 节流函数
 */
const useThrottle = <T extends any[]>(func: (...arg: T) => void, wait: number) => {
  let timeout: NodeJS.Timeout | null;
  return (...args: T) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func(...args);
      }, wait);
    }
  };
};

export default useThrottle;
