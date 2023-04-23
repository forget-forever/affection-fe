// import { GenderEnum } from "./enum";

// declare global {
  declare type IStorage = Partial<{
    info: {
      openId: GlobalState['common']['openId']
      userInfo: GlobalState['common']['userInfo']
      token: GlobalState['common']['token'];
    }
    openId: GlobalState['common']['openId']
  }>
// }