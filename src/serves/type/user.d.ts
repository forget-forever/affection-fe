import { SmsCodeUseType } from "@/utils/enum"

declare global {
  declare namespace IRequest {
    type SendVerifyCodeParams = {
      phone: string;
      userType: SmsCodeUseType;
      openId: string;
    }
    type VerifyCodeBindParams = {
      phone: string,
      smsCode: string,
      openId: string
    }
  }
}