import request from '@/utils/request'

export default {
    /**
     * 添加课程评论
     * @param {课程评论对象} comment 
     * @returns 
     */
    saveComment(comment) {
        return request({
            url: `/eduservice/edu-comment/saveComment`,
            method: "POST",
            data: comment
        })
    },

    /**
     * 分页查询课程评论
     * @param {当前页} page 
     * @param {每页大小} limit 
     * @param {课程id} courseId 
     * @returns 
     */
    pageCommentList(page, limit, courseId) {
        return request({
            url: `/eduservice/edu-comment/pageCommentList/${page}/${limit}/${courseId}`,
            method: "POST",
        })
    }

}