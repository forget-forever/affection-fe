import { Button, ButtonProps } from "@tarojs/components"

type IProps = ButtonProps
const MyButton: React.FC<IProps> = (props) => {
  const { onClick, onLongClick, onLongPress, loading, disabled, children } = props;
  return <Button
    {...props}
    onClick={(e) => {
      if (!loading && !disabled) {
        onClick?.(e);
      }
    }}
    onLaunchapp={(e) => {
      if (!loading && !disabled) {
        onLongClick?.(e);
      }
    }}
    onLongPress={(e) => {
      if (!loading && !disabled) {
        onLongPress?.(e);
      }
    }}
  >{children}</Button>
}

export default MyButton;