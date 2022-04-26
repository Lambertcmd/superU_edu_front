import axios from 'axios'
import cookie from 'js-cookie';
import { MessageBox, Message } from 'element-ui'
// 创建axios实例
const service = axios.create({
    baseURL: 'http://localhost:8222', // api的base_url
    timeout: 20000 // 请求超时时间
})

// http request 拦截器
service.interceptors.request.use(
    config => {
        //debugger
        //判断cookie中是否有guli_token数据
        if (cookie.get('guli_token')) {
            //把获取的cookie值放到header里
            config.headers['token'] = cookie.get('guli_token');
        }
        return config
    },
    err => {
        return Promise.reject(err);
    }
)

// 接收后端返回报错的结果集进行处理
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
    */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data

        if (res.code == 28004) {
            console.log("response.data.resultCode是28004")
            // 返回 错误代码-1 清除ticket信息并跳转到登录页面
            //debugger
            Message({
                message: res.message,
                type: 'error',
                duration: 5 * 1000
            })
            // window.location.href = "/login"
            return res
        } else if (res.code !== 20000) { // if the custom code is not 20000, it is judged as an error.
            //25000：订单支付中，不做任何提示
            if (res.code != 25000) {
                Message({
                    message: res.message || 'error',
                    type: 'error',
                    duration: 5 * 1000
                })
            }
        }else{
            return res;
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service