// import { PageContainer } from '@/components'
import useData from '@/utils/hooks/useData'
import { WebView } from '@tarojs/components'
import React, { useEffect, useMemo } from 'react'
// import { Filter, Join, Star } from './components'

const Index: React.FC = () => {
  const token =  useData((state) => state.common.token);
  
  const src = useMemo(() => {
    if (token?.val) {
      return `http://192.168.0.101:10086/#/pages/h5pages/index/index?token=${token.val}&time=${token.time}`;
    } else {
      return 'http://192.168.0.101:10086/#/pages/h5pages/index/index';
    }
  }, [token])


  useEffect(() => {
    // getUserInfo({
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
    // setTimeout(() => {
    //   console.log('aaaaa')
    //   setShow(true)
    // }, 8000)
  }, [])
  
  return (
    // <PageContainer hideNavigate>
    //   {/* <Star /> */}
    //   <Filter />
    //   <Join />
    // </PageContainer>
    <WebView onMessage={(e) => {console.log(e)}} src={src} ></WebView>
  )
}
export default Index
