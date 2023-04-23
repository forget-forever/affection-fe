import { getSystemInfoSync } from "@tarojs/taro";

const { statusBarHeight, screenWidth, screenHeight } = getSystemInfoSync()
const getCustomHeight = () => {
  if (statusBarHeight >= 30) {
    return statusBarHeight * 2
  } else {
    return statusBarHeight * 750 / screenWidth + statusBarHeight;
  }
}
export const system = {
  statusBarHeight,
  screenWidth,
  screenHeight,
  customHeight: getCustomHeight(),
  ossUrl: 'https://aiquyin-file-beijing.oss-cn-beijing.aliyuncs.com/ContactMe/Images/'
}

export const getOssUrl = (url: string) => `${system.ossUrl}${url}`