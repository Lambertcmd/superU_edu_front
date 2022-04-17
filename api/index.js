import request from '@/utils/request'

export default{
    /**
     * 获取首页显示的八个课程和四个讲师
     * @returns 
     */
    getIndexData(){
        return request({
            url:`/eduservice/index/getIndexData`,
            method:"GET"
        })
    }
}