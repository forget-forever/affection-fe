import { getLocalStorage } from "@/utils/utils";

const info = getLocalStorage('info');
let openId: string | undefined = ''
if (info?.openId) {
  openId = getLocalStorage('openId');
}
const initState: GlobalState = {
  common: {
    userInfo: info?.userInfo,
    openId: info?.openId || openId,
    token: info?.token,
    themeColor: '#333'
  },
  global: {
    modalMsg: undefined
  }
}

export default initState;
