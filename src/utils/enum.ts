export enum GenderEnum {
  /** 男 */
  male = 1,
  /** 女 */
  female,
  /** 保密 */
  secret
}
export enum PlatformType {
  /** 微信小程序 */
  WxMiniProgram = 1,
  /** QQ小程序 */
  QQMiniProgram,
  /** 微信公众号 */
  WxPublicAccount,
  /** 网页 */
  Website,
  /** 安卓app */
  AndroidApp,
  /** Ios App */
  IosApp,
}
export enum ContentType {
  /** 联系方式 */
  contactInfo = 1,
  /** 动态 */
  moment = 2,
}
/** 账号类型 */
export enum UserType {
  normal = 1,
  admin = 2
}
/** 账号状态 */
export enum UserStatus {
  /** 正常， 审核通过就是这个状态 */
  normal = 1,
  /** 封禁 */
  banned,
  /** 审核中 */
  checking,
  /**  审核失败 */
  checkFailed
}
/** 绑定状态 */
export enum BindStatus {
  binding = 1,
  unbind
}
export enum DomainType {
  /** 手机号 */
  phone = 1,
  /** 微信 */
  wechat,
  /** QQ */
  qq,
  /** 微博 */
  weibo,
  /** 抖音 */
  tiktok,
  /** 邮箱 */
  email,
  /** 其他 */
  other,
}

/** 投放的盲盒状态 */
export enum BlindBox {
  /** 审核中 */
  checking = 1,
  /** 审核失败 */
  checkFailed,
  /** 等待被抽取 */
  waitingGet,
  /** 已经被抽取 */
  beGot,
}

/** 剩余次数的类型 */
export enum ChanceType {
  /** 抽取 */
  get = 1,
  /** 投送 */
  post = 2
}

/** 改变的机会类型 */
export enum ChangeChanceType {
  /** 消耗次数 */
  cost = 1,
  /** 得到次数 */
  get
}

/** 为什么回改变拥有的机会 */
export enum ChangeReasonEnum {
  /** 用户消费(获取),可能是签到或者说活动中获取的 */
  userUseGet = 1,
  /** 用户消费(发布)，发布一些内容获取的 */
  userUsePost,
  /** 购买 */
  purchase,
  /** 观看广告 */
  advertisement,
}

/**  发送验证码的场景 */
export enum SmsCodeUseType {
  wxBind = 1
}