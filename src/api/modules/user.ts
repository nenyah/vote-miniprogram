import { LoginResponse, UserInfoResponse } from '@/common/interface'
import request from '../../utils/request'
type Code = string
type Signature = string
type EncryptedData = string
type IV = string
export interface UserParams {
    signature: Signature
    encryptedData: EncryptedData
    iv: IV
}
export default {
    wxMaLogin: async (code: Code): Promise<LoginResponse> => {
        return request({
            url: `weixin/login`,
            method: 'POST',
            data: code,
        })
    },
    info: (userparams: UserParams): Promise<UserInfoResponse>=> {
        return request({
            url: `weixin/user`,
            data: {
                ...userparams,
            },
        })
    },
}
