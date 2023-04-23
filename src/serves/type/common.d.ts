import { GenderEnum, UserStatus, UserType } from "@/utils/enum"

declare global {
  namespace IRequest {
    type ILoginParams = {
      code: string
    }
    type ILoginRes = {
      Token: string;
      UserInfo: {
        UserName: string;
        Phone: string;
        Name: string;
        Gender: GenderEnum;
        HeaderPic: string;
        UserType: UserType;
        UserStatus: UserStatus;
        Description: string;
        Photos: string;
        Country: string;
        Province: string;
        City: string;
        District: string;
        Birthday: string;
        UpdateTime: IDateTime;
        CreateTime: IDateTime;
      };
      OpenId: string;
    }
    type BindPhoneParams = {
      rawData: {
        encryptedData: string;
        iv:	string;
        cloudID?: string;
      }
      openId: string;
    }
    type BindPhoneRes =  {
      UserName: string;
      Phone: string;
      Name: string;
      Gender: number;
      HeaderPic: string;
      UserType: number;
      UserStatus: number;
      Description: string;
      Photos: string;
      Country: string;
      Province: string;
      City: string;
      District: string;
      Birthday: string;
      UpdateTime: IDateTime;
      CreateTime: IDateTime;
    }
  }
}
