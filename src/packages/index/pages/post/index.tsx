import { MyRadio, PageContainer } from "@/components/index";
import GetPhone from "@/components/GetPhone";
import { actions } from "@/store";
import useData from "@/utils/hooks/useData";
import { useEffect } from "react";
import { GenderEnum } from "@/utils/enum";
import { View } from "@tarojs/components";
import { Label } from "../../components";

const Post: React.FC = () => {
  const { token } = useData((state) => state.common)
  useEffect(() => {
    if(!token) {
      actions.modalOption({
        title: '绑定提醒',
        content: <GetPhone>授权登陆</GetPhone>,
        hideButton: true,
        closeOnClickOverlay: false,
      })
    }
  }, [token])

  return <PageContainer title='期待缘分与你相遇'>
    <Label title='投送对象'>
      <MyRadio
        initValue={GenderEnum.male}
        options={[
          {value: GenderEnum.male, label: <View className='iconfont icon-gendermale'>男</View>},
          {value: GenderEnum.female, label: <View className='iconfont icon-gender-female text-pink'>女</View>}
        ]}
      />
    </Label>
  </PageContainer>
}
export default Post;
