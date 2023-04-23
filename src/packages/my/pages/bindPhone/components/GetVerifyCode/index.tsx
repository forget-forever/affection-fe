import { MyButton } from "@/components/index"
import { sendVerifyCodeByOpenId } from "@/serves/user"
import { SmsCodeUseType } from "@/utils/enum"
import { isPhone } from "@/utils/tool"
import { useState, useCallback, useMemo } from "react"
import { AtInput } from "taro-ui"

type IProps = {
  msg: IRequest.VerifyCodeBindParams
  setMsg?: (msg: IRequest.VerifyCodeBindParams) => void
  className?: string;
}
const GetVerifyCode: React.FC<IProps> = (props) => {
  const { msg, setMsg, className } = props;
  const [tip, setTip] = useState('发送验证码');
  const [ loading, setLoading ] = useState(false)

  const countDown = useCallback((num: number) => {
    try {
      if (num > 0 && setMsg) {
        setTip(`${num}s后重试`);
        setTimeout(() => countDown(num - 1), 1000)
      } else {
        setTip('重新发送')
      }
    } catch (error) {}
  },[setMsg]);

  const canSendVerifyCode = useMemo(() => !isPhone(msg.phone) || (tip !== '发送验证码' && tip !== '重新发送'), [msg.phone, tip])

  const sendVerifyCode = useCallback(async () => {
    const { phone, openId } = msg;
    setLoading(true)
    try {
      await sendVerifyCodeByOpenId({ phone, openId, userType: SmsCodeUseType.wxBind });
      countDown(60);
    } catch (error) {}
    setLoading(false);
  }, [countDown, msg])

  return <AtInput
    clear
    title='验证码'
    type='number'
    maxlength={4}
    placeholder='验证码'
    value={msg.smsCode}
    onChange={(val) => setMsg?.({ ...msg, smsCode: `${val}` })}
    name='smsCode'
    className={className}
  >
    <MyButton
      type='primary'
      disabled={canSendVerifyCode}
      onClick={sendVerifyCode}
      style={{borderRadius: 0, width: '110px', padding: 0, height: '36px', lineHeight: '36px' }}
      loading={loading}
    >
      {tip}
    </MyButton>
  </AtInput>
}
export default GetVerifyCode;
