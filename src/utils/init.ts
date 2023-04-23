import { login } from '@tarojs/taro'
import { loginServe } from '@/serves/common';
import { actions } from '@/store';
// import { showModal } from '@/components/Modal/options';
import { projectType } from './utils';

type IRes = PromiseReturn<typeof loginServe>
export const initLogin = async () => {
  const loginMsg = await login();
  try {
    const {data} = await loginServe({code: loginMsg.code});
    const { userInfo, openId, token } = data;
    actions.setToken({userInfo, openId, token});
    // res.data.
  } catch (err) {
    if (projectType<IRes>(err, (e) => !!(e as IRes)?.data.openId)) {
      const { data } = err;
      actions.setOpenId(data.openId)
    }
  }
}

export const initH5 = () => {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = 'https://res.wx.qq.com/open/js/jweixin-1.3.2.js';
  document.head.appendChild(script);    
}