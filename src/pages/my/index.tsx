import { PageContainer } from "@/components/index"
import { useEffect } from "react"
import { AtAvatar } from "taro-ui"
import ListItem from "./components/ListItem"

export default () => {
 
  useEffect(() => {
    // setTimeout(() => {
    //   showModal({title: 'test', content: 'data.openId' })
    // }, 2000);
  })
  return <PageContainer title='个人中心' hideBack>
    <AtAvatar>
    </AtAvatar>
    <ListItem />
  </PageContainer>
}