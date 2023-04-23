import { AtIcon, AtModal, AtModalAction, AtModalContent, AtModalHeader } from 'taro-ui';
import { Component, CSSProperties } from 'react';
import MyButton from '../MyButton';
import styles from './index.module.scss';
// import { useMoalState } from './options';

type ModalMsg = {
  title: React.ReactNode;
  content: React.ReactNode;
  closeOnClickOverlay?: boolean
  positiveText?: string; // 积极操作的文字
  passiveText?: string; // 消极/取消操作的文字
  positiveIcon?: React.ReactNode;
  passiveIcon?: React.ReactNode;
  positiveButton?: React.ReactNode;
  passiveButton?: React.ReactNode;
  hideButton?: boolean;
  hidePositiveButton?: boolean;
  hidePassiveButton?: boolean;
  showClose?: boolean;
  positiveHandle?: () => void;
  passiveHandle?: () => void;
}
type IProps = {
  style?: CSSProperties;
  onCancel?: () => void;
};
interface Modal {
  props: IProps;
  state: {
    msg?: ModalMsg;
    positiveButton?: React.ReactNode;
    passiveButton?: React.ReactNode;
  }
  setState: (s: Partial<Modal['state']>, cb?: () => void) => void
}
class Modal extends Component {
  constructor(props: IProps) {
    super(props);
    this.state = {
      msg: undefined,
    }
  }
  showModal = (msg: ModalMsg) => {
    return new Promise<void>((resolve, reject) => {
      this.setState({
        msg,
        positiveButton: <MyButton
          style={{ margin: '5px' }}
          type='primary'
          onClick={() => this.hideShow(() => resolve?.())}
        >
          {msg.positiveIcon}{msg.positiveText || '确定' }
        </MyButton>,
        passiveButton: <MyButton
          style={{ margin: '5px' }}
          type='primary'
          onClick={() => this.hideShow(() => reject?.())}
        >
          {msg.passiveIcon}{msg.passiveText || '取消' }
        </MyButton>
      })
    })
  }
  hideShow = (cb?: () => void) => {
    const { onCancel } = this.props;
    onCancel?.()
    this.setState({
      msg: undefined,
      positiveButton: undefined,
      passiveButton: undefined
    }, cb);
  }

  render() {
    const { msg, positiveButton, passiveButton } = this.state;
    const { style } = this.props;
    return (
      <AtModal
        customStyle={style}
        isOpened={!!msg}
        closeOnClickOverlay={msg?.closeOnClickOverlay ?? true}
        onCancel={() => this.hideShow()}
      >
        <AtModalHeader>
          {msg?.title}
          {msg?.showClose && <AtIcon value='close' className={styles.closeIcon} onClick={() => this.hideShow()} />}
        </AtModalHeader>
        <AtModalContent>{msg?.content}</AtModalContent>
        {!msg?.hideButton && <AtModalAction>
          {!msg?.hidePassiveButton && (msg?.passiveButton || passiveButton)}
          {!msg?.hidePositiveButton && (msg?.positiveButton || positiveButton)}
        </AtModalAction>}
      </AtModal>
    )
  }
}

export default Modal;
