import { GetPhone, MyButton, PageContainer } from '@/components/index';
import { View, Text } from '@tarojs/components';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AtForm, AtInput } from 'taro-ui';
import classNames from 'classnames';
import useData from '@/utils/hooks/useData';
import { bindwxProgramByPhone } from '@/serves/user';
import { showMaskToast } from '@/utils/utils';
import { initLogin } from '@/utils/init';
import { navigateBack } from '@/router';
import useRouterParams from '@/utils/hooks/useRouterParams';
import { actions } from '@/store';
import GetVerifyCode from './components/GetVerifyCode';
import { canSubmit } from './util';
import styles from './index.module.scss';

const BindPhone: React.FC = () => {
  const { openId } = useData((state) => state.common)
  const [ msg, setMsg ] = useState<IRequest.VerifyCodeBindParams>({
    phone: '',
    smsCode: '',
    openId: openId!
  });
  const [ loading, setLoading ] = useState(false);
  const isOk = useMemo(() => canSubmit(msg), [msg]);
  const params = useRouterParams('bindPhoneNumber');

  useEffect(() => {
    if (params?.needWxBind) {
      actions.modalOption({
        title: '绑定提醒',
        content: <>
          <GetPhone
            redirectBindPhone={false}
            onSubmit={(res) => {
              if (res === 'ok') navigateBack();
            }}
          >授权登陆</GetPhone>
        </>,
        hideButton: true,
        showClose: true,
      });
    }
  }, [params?.needWxBind])

  const submit = useCallback(async () => {
    try {
      setLoading(true);
      await bindwxProgramByPhone(msg);
      showMaskToast('绑定成功');
      setTimeout(async () => {
        await initLogin()
      }, 50)
      navigateBack()
    } catch (error) {}
    setLoading(false);
  }, [msg])

  return (
    <PageContainer title='绑定手机'>
      <AtForm customStyle={{padding: '20px 0', height: '100%'}}>
        <AtInput
          name='phone'
          type='phone'
          title='手机号码'
          placeholder='请输入手机号码'
          value={msg?.phone}
          border
          className={styles.inputItem}
          onChange={(val) => setMsg({...msg, phone: `${val}`})}
        />
        <GetVerifyCode className={styles.inputItem} msg={msg} setMsg={(val) => setMsg(val)} />
        <MyButton
          type='primary'
          className={classNames('width-8', styles.submit)}
          disabled={!isOk}
          onClick={submit}
          loading={loading}
        >
          确定
        </MyButton>
        <View className={styles.wxLogin}>
          <GetPhone
            style={{ width: '60%', background: '#fff', height: '40px', lineHeight: '37px', borderRadius: '20px' }}
            redirectBindPhone={false}
            onSubmit={(res) => {
              if (res === 'ok') {
                navigateBack()
              }
            }}
            describe=''
          >
            <Text style={{ color: '#24dc5a', fontSize: '24px' }} className='iconfont icon-weixin'></Text>
            &nbsp;&nbsp;<Text className={styles.wxLoginButton}>微信登陆</Text>
          </GetPhone>
        </View>
      </AtForm>
    </PageContainer>
  )
}

export default BindPhone;