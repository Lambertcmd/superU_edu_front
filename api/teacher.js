import request from '@/utils/request';

export default {
    /**
     * 分页查询前台讲师模块数据
     * @param {当前页} page 
     * @param {页大小} limit 
     * @returns 
     */
    getTeacherFrontList(page, limit) {
        return request({
            url: `/eduservice/teacherfront/getTeacherFrontList/${page}/${limit}`,
            method: "POST"
        })
    },

    getTeacherFrontInfo(id) {
        return request({
            url: `/eduservice/teacherfront/getTeacherFrontInfo/${id}`,
            method: "GET"
        })
    }


}