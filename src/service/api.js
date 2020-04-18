

import request from "@/utils/request"
export default {
    /**
     * 获取认证信息
     */
    getUserInfo() {
        return request({
            url: '/api/user',
            method: 'GET'
        })
    },
    login(params) {
        return request({
            url: '/api/auth/login',
            method: 'POST',
            params:params
        })
    },
}
