import { View } from "@tarojs/components"
import classNames from "classnames";
import { CSSProperties, useMemo } from "react";
import styles from './index.module.scss'

type IProps = {
  width?: number;
  height?: number;
  direction?: 'top' | 'bottom',
  borderRight?: number
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
  background?: string
}
const TrapezoidButton: React.FC<IProps> = (props) => {
  const {
    direction = 'top',
    style,
    className,
    width = 60,
    height = 100,
    borderRight = 36,
    onClick,
    background = 'maincolor'
  } = props;
  const trapezoidStyle = useMemo<CSSProperties>(() => {
    if (direction === 'top') {
      return {
        borderTop: `${height}px solid var(--${background})`,
        borderRight: `${borderRight}px solid transparent`,
        width: `${width}px`,
      }
    }
    return {
      borderBottom: `${height}px solid var(--${background})`,
      borderLeft: `${borderRight}px solid transparent`,
      width: `${width}px`
    }
  }, [background, borderRight, direction, height, width])
  return <View
    style={{ ...trapezoidStyle, ...style }}
    className={classNames(styles.container, className, 'relative')}
  >
    <View
      className={classNames('absolute', 'flex', styles.content)}
      style={{left: 0, width: `${width}px`, height: `${height}px`, [direction]: `-${height}px`, lineHeight: `${height}px`}}
      onClick={onClick}
    >
      {props.children}
    </View>
  </View>
} 
export default TrapezoidButton;
