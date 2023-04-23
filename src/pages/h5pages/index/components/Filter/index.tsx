import { Modal, MyButton, RadioButton } from "@/components";
import { h5Navigate } from "@/router";
import useData from "@/utils/hooks/useData";
import { View } from "@tarojs/components";
import { createRef } from "react";
import OperateButton from "../OperateButton";
import { matchingList } from "./config";
import styles from './index.module.scss';

const Filter: React.FC  = () => {
  const ModalRef = createRef<Modal>();
  const { token } = useData((state) => state.common)

  const clickHandle = async () => {
    if(!token?.val) {
      h5Navigate('bindPhoneNumber', {params: {needWxBind: 'yes'}});
      return;
    }
    await ModalRef.current?.showModal({
      title: '筛选条件',
      content: <>
        <RadioButton
          title='星球'
          options={[
            { value: 0, label: '星球一' },
            { value: 1, label: '星球二' },
            { value: 2, label: '星球一' },
            { value: 3, label: '星球二' },
            { value: 4, label: '星球一' },
            { value: 5, label: '星球二' }
          ]}
        />
        <RadioButton
          style={{marginTop: '15px'}}
          title='匹配'
          options={matchingList}
        />
        <MyButton type='primary' className='margin-top'>确 &nbsp;定</MyButton>
      </>,
      hideButton: true,
      showClose: true
    })
    
  }
  
  return <View className='self-modal_container'>
    <OperateButton className={styles.filterButton} onClick={clickHandle}>
      筛 选
    </OperateButton>
    <Modal ref={ModalRef} />
  </View>
}
export default Filter;