import request from '@/utils/request'

export default {
    /**
     * 创建订单
     * @param {订单} orderVo 
     * @returns 
     */
    createOrder(orderVo) {
        return request({
            url: `/eduorder/order/createOrder`,
            method: "POST",
            data: orderVo
        })
    },

    /**
     * 根据订单号获取订单信息
     * @param {订单号} orderNo 
     * @returns 
     */
    getOrderByOrderNo(orderNo) {
        return request({
            url: `/eduorder/order/getOrderByOrderNo/${orderNo}`,
            method: "GET"
        })
    },

    /**
     * 调用微信支付 生成微信支付二维码
     * @param {订单号} orderNo 
     */
    createNative(orderNo) {
        return request({
            url: `/eduorder/pay-log/createNative/${orderNo}`,
            method: "GET"
        })
    },

    /**
     * 查询支付状态
     * @param {订单号} orderNo 
     * @returns 
     */
    getPayStatus(orderNo){
        return request({
            url: `/eduorder/pay-log/getPayStatus/${orderNo}`,
            method: "GET"
        })
    }

}