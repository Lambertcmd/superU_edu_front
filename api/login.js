import request from '@/utils/request'

export default {

    /**
     * 用户登录
     * @param {*} loginVo 
     * @returns 
     */
    loginUser(loginVo) {
        return request({
            url: `/educenter/member/login`,
            method: "POST",
            data: loginVo
        })
    },
    
    /**
     * 根据token获取用户信息
     * @returns 
     */
    getUserInfo(){
        return request({
            url:`/educenter/member/getUserInfo`,
            method:"GET",
        })
    },

    /**
     * 微信扫码登录页面
     * @returns 
     */
    getWxQRCodeLogin(){
        return request({
            url:`/api/ucenter/wx/login`,
            method:"GET"
        })
    }
}