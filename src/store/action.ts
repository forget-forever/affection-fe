import { setLocalStorage } from "@/utils/utils"
import dayjs from "dayjs";
import { setState } from "."

export const actions = {
  setOpenId: async (openId: string) => {
    setLocalStorage('openId', openId);
    setState('common', {openId})
    return openId;
  },
  setToken: async ( msg: {openId: string, token: string, userInfo: GlobalState['common']['userInfo']} ) => {
    const { openId, token, userInfo } = msg;
    const tokenData = { val: token, time: +dayjs().unix() };
    setLocalStorage('info', {openId, token: tokenData, userInfo});
    setState('common', { openId, token: tokenData, userInfo });
  },
  /**
   * 自定义的全局的modal提示框
   * @param msg modal的参数设置为 undefined 的时候 modal 消失
   */
  modalOption: async (msg: GlobalState['global']['modalMsg']) => {
    setTimeout(() => {
      setState('global', {modalMsg: msg})
    }, 0)
  }
}
