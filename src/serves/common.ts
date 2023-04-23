import { request } from "@/utils/request";

export const loginServe = (params: IRequest.ILoginParams) => request<IRequest.ILoginRes>('/User/Account/WxMiniProgramLogin', {
  data: params,
  paramsToBigCamel: false
})

export const bindWxPhone = (params: IRequest.BindPhoneParams) => {
  return request<{}, {result: IRequest.BindPhoneRes}>('/User/Account/BindWxMiniProgram', {
    method: 'POST',
    data: params,
    paramsToBigCamel: false,
  })
}