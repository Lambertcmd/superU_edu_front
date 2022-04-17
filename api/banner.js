import request from '@/utils/request'

export default {
    /**
     * 获取所有banner的前两条
     * @returns 
     */
    getAllBanner() {
        return request({
            url: `/educms/bannerFront/getAllBanner`,
            method: "GET"
        })
    }
}