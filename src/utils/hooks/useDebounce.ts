const debounce = <T extends any[]>(fn: (...arg: T) => void, ms: number) => {
  let timer: NodeJS.Timeout | null;
  return (...arg: T) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...arg);
      timer = null;
    }, ms);
  };
};

/**
 * 事件防抖的hook
 * @param fn 执行的函数
 * @param time 防抖延迟
 * @returns 防抖处理后的函数
 */
export default <T extends any[]>(fn: (...arg: T) => void, time: number) => {
  return debounce(fn, time);
};
