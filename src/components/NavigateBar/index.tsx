import { navigate, navigateBack } from "@/router"
import { system } from "@/utils/config"
import useData from "@/utils/hooks/useData"
import { View } from "@tarojs/components"
import { AtNavBar } from "taro-ui"

export type NavigateProps = {
  /**
   * navigateBar显示的标题
   */
  title?: string;
  /**
   * navagateBar的背景
   */
  background?: string;
  /**
   * 隐藏掉navagateBar的返回按钮
   */
  hideBack?: boolean;
  /**
   * 拦截返回操作
   */
  backHandle?: () => void;
}
const NaviagteBar: React.FC<NavigateProps> = (props) => {
  const { title, hideBack, backHandle, background } = props;

  const handleClick = async () => {
    if (hideBack) return;
    if (backHandle) {
      backHandle()
    } else {
      try {
        navigateBack()
      } catch (error) {
        navigate('index', {type: 'reLaunch'});
      }
      
    }
  }
  const themeColor = useData((state) => state.common.themeColor);

  return (
    <>
      <View
        className='fixed'
        style={{
          width: '100vw',
          paddingTop: `${system.statusBarHeight}px`,
          background: background || themeColor,
          top: 0,
          boxSizing: 'border-box',
          zIndex: 10,
        }}
      >
        <AtNavBar
          onClickLeftIcon={handleClick}
          color='#fff'
          customStyle={{background: themeColor}}
          title={title || '情谊盲盒'}
          leftIconType={!hideBack ? 'chevron-left' : undefined}
          leftText={!hideBack ? '返回' : undefined}
          border={false}
        />
      </View>
      <View style={{width: '100vw', height: `${system.customHeight}px`}} /> 
    </>
  )
}
export default NaviagteBar;