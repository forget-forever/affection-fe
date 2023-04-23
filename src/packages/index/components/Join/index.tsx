import { View, Text } from "@tarojs/components";
import OperateButton from "../OperateButton";
import styles from "./index.module.scss";

const Join: React.FC = () => {
  
  return <View className={styles.container}>
    <OperateButton className='animation-slide-left'>
      <Text style={{fontSize: '18px'}} className='iconfont icon-sousuoleimufill' /> 抽
    </OperateButton>
    <OperateButton className='animation-slide-right'>
      <Text style={{fontSize: '18px'}} className='iconfont icon-sousuoleimufill' /> 投
    </OperateButton>
  </View>
};

export default Join;
