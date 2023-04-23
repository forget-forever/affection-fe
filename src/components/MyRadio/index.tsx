import { store } from "@/store";
import { BaseEventOrig, Label, Radio, RadioGroup } from "@tarojs/components";
import { Component, CSSProperties } from "react";

type IProps<V, L> = {
  options: IOptions<V, L>[];
  style?: CSSProperties;
  className?: string;
  labelStyle?: CSSProperties;
  initValue?: V;
  onChange?: (val: V) => void;
}
type IState<V extends string | number> = {
  val: V | undefined
}
interface MyRadio<V extends string | number, L> {
  props: IProps<V, L>;
  state: IState<V>;
  setState: (s: Partial<IState<V>>, cb?: () => void) => void
}
class MyRadio<V extends string | number, L> extends Component {
  constructor(props: IProps<V, L>) {
    super(props);
    const { initValue } = props;
    this.state = {
      val: initValue
    }
  }
  onChange = (e: BaseEventOrig<{value: V}>) => {
    let val: string | number = e.detail.value;
    const [item] = this.props.options;
    const { onChange } = this.props;
    if (typeof item.value === 'number') {
      val = +val;
    }
    this.setState({val: val as V}, () => {onChange?.(val as V)})
  };
  getValue = () => {
    return this.state.val;
  };
  render() {
    const { options, style, className, labelStyle } = this.props;
    const { val } = this.state;
    const { themeColor } = store.getState().common
    return(<RadioGroup className={className} style={{display: 'flex', ...style}} onChange={this.onChange}>
      {options.map(({value, label}) => (
        <Label style={{margin: '0 10px', ...labelStyle}} for={`${value}`} key={`${value}`}>
          <Radio color={themeColor} value={value as string} checked={val === value}>{label}</Radio>
        </Label>
      ))}
    </RadioGroup>)
  }
}

export default MyRadio;