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
    }
}