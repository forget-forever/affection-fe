import { GetPhone } from "@/components";

export const bindTipNode = (success: () => void) => <GetPhone
  onSubmit={(res) => {
    if (res === 'ok') {
      success()
    }
  }}
>授权登陆</GetPhone>