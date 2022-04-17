import request from '@/utils/request'

export default {

    /**
     * 根据手机号发送验证码
     * @param {手机号码} phone 
     * @returns 
     */
    sendMsm(phone){
        return request({
            url:`/edumsm/msm/send/${phone}`,
            method:"GET"
        })
    },

    /**
     * 用户注册
     * @param {*} registerVo 
     * @returns 
     */
    registerUser(registerVo) {
        return request({
            url: `/educenter/member/register`,
            method: "POST",
            data: registerVo
        })
    }
}