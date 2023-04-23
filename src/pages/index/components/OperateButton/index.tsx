import { MyButton } from "@/components";
import classNames from "classnames";
import styles from './index.module.scss';

type IProps = {
  onClick?: () => void;
  className?: string
}
const OperateButton: React.FC<IProps> = (props) => {
  const { onClick, children, className } = props;
  return <MyButton className={classNames(styles.buttonContainer, className)} onClick={onClick}>
    {children}
  </MyButton>
}

export default OperateButton;
