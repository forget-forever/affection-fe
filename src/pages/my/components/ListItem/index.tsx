import { actions } from "@/store";
// import useData from "@/utils/hooks/useData";
import { Button } from "@tarojs/components";

export default () => {
  // const data = useData((state) => {
  //   return state.common
  // })
  return <>
    <Button type='primary' onClick={() => {
      actions.modalOption({
        title: '标题',
        content: '这里是标题'
      })
    }}
    >按钮</Button>
  </>
}