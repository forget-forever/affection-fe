import { request } from "@/utils/request";

export const sendVerifyCodeByOpenId = (data: IRequest.SendVerifyCodeParams) => request<{}>(
  '/User/Account/SendSmsCodeByOpenId',
  {
    method: 'POST',
    data
  }
);

export const bindwxProgramByPhone = (data: IRequest.VerifyCodeBindParams) => request<{}, {result: IRequest.BindPhoneRes}>(
  '/User/Account/BindWxMiniProgramByPhone',
  {
    method: 'POST',
    data
  }
);