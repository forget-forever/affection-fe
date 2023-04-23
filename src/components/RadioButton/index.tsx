import { View } from "@tarojs/components";
import { Component, CSSProperties } from "react";
import { MyButton } from "..";
import styles from './index.module.scss';

type IProps<L, V extends string | number> = {
  options: IOptions<V, L>[];
  title?: string;
  defaultIndex?: number;
  icon?: React.ReactNode;
  style?: CSSProperties;
  buttonStyle?: CSSProperties;
  onChange?: (e: V) => void;
}
interface RadioButton<L, V extends string | number> {
  props: IProps<L, V>;
  state: {
    val: V;
  };
  setState: (s: Partial<RadioButton<L, V>['state']>, cb?: () => void) => void;
}
class RadioButton<L, V extends string | number> extends Component {
  constructor(props: IProps<L, V>) {
    super(props);
    const { defaultIndex, options } = props;
    this.state = {
      val: options[defaultIndex || 0]?.value,
    };
  }
  /**
   * 在父组件中通过这个方法获取到选了哪个参数
   * @returns 选中的val值，传入的泛型的那种类型
   */
  getValue = () => {
    const { val } = this.state
    return val;
  }

  onChange = (val: V) => {
    const { onChange } = this.props;
    this.setState({ val })
    onChange?.(val)
  }

  render() {
    const { style, icon, title, options } = this.props;
    const { val } = this.state;
    return <View style={style} className={styles.radioBlock}>
      <View className={styles.radioTitle}>
        {icon && icon} {title || ''}
      </View>
      <View className={styles.labelBlock}>
        {options.map((item) => <MyButton
          size='mini'
          type={val === item.value ? 'primary' : undefined}
          key={item.value}
          onClick={() => this.onChange(item.value)}
          className={styles.radioLabel}
        >
          {item.label}
        </MyButton>)}
      </View>
    </View>
  }
}

export default RadioButton;
