import { View } from "@tarojs/components";
import styles from './index.module.scss';

type IProps = {
  title: string;
}
const Label: React.FC<IProps> = (props) => {
  const { children, title } = props;
  return <View className={styles.labelContainer}>
    <View className={styles.title}>{title}:</View>
    <View className={styles.content}>{children}</View>
  </View>
}

export default Label;
