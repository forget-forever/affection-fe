import { useSelector } from "react-redux";

/**
 * 二次封装的useSelector,为了类型提示方便
 * @param cb useSelector的回调
 * @returns cb 函数的返回值
 */
const useData = <S>(cb: (s: GlobalState) => S) => {
  return useSelector<GlobalState, S>(cb)
}

export default useData;