import Modal from "@/components/Modal";

declare global {
  declare type GlobalState = {
    common: {
      userInfo: ISmallCamel<IRequest.ILoginRes['UserInfo']> | undefined,
      openId: string | undefined,
      token: {
        val: string;
        time: number;
      } | undefined
      themeColor: string
    };
    global: {
      modalMsg: (Modal['state']['msg'] & Partial<Record<'success' | 'cancel' | 'complete', () => void>>) | undefined
    }
  }
}