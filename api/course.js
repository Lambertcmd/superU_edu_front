import request from '@/utils/request'

export default {

    /**
     * 分页复杂查询课程列表
     * @param {当前页} page 
     * @param {每页大小} limit 
     * @param {查询条件} searchObj 
     * @returns 
     */
    pageCourseList(page, limit, searchObj) {
        return request({
            url: `/eduservice/coursefront/${page}/${limit}`,
            method: "POST",
            data: searchObj
        })
    },

    /**
     * 获取所有分类(树形一级分类下包含二级分类)
     * @returns 
     */
    getAllSubject() {
        return request({
            url: `/eduservice/edu-subject/getAllSubject`,
            method: "GET"
        })
    },

    /**
     * 访问课程详情页获取课程详情信息
     * @param {课程id} courseId 
     * @returns 
     */
    getFrontCourseInfo(courseId){
        return request({
            url:`/eduservice/coursefront/getFrontCourseInfo/${courseId}`,
            method:"GET"
        })
    }
}