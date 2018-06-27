'use strict'

import axios from 'axios'
import qs from 'qs'

// 请求过滤
axios.interceptors.request.use(config => { // config包含每次请求的内容
    if (localStorage.getItem('token')) {
        config.headers.token = `${localStorage.getItem('token')}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 响应过滤
axios.interceptors.response.use(response => {
    return checkStatus(response);
}, error => {
    return Promise.resolve(error.response);
});

function checkStatus (response) {
    // http状态码正常，直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
        return response;
    }
    // 异常状态下，把错误信息返回去
    return {
        status: -404,
        msg: '网络异常',
    }
}

let baseURL = 'http://www.apidoc.test';
let apiversion = 'v1';

// 请求方式的配置
export default {
    get(url, params, apiversion='v1') {
        return axios({
            method: 'get',
            baseURL: baseURL + '/' + apiversion,
            url,
            params,
            timeout: 5000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
    },
    post(url, data, apiversion='v1') {
        return axios({
            method: 'post',
            baseURL: baseURL + '/' + apiversion,
            url,
            data: qs.stringify(data),
            timeout: 5000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
    },
    put(url, data, apiversion='v1') {
        return axios({
            method: 'put',
            baseURL: baseURL + '/' + apiversion,
            url,
            data: qs.stringify(data),
            timeout: 5000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
    },
    patch(url, data, apiversion='v1') {
        return axios({
            method: 'patch',
            baseURL: baseURL + '/' + apiversion,
            url,
            data: qs.stringify(data),
            timeout: 5000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
    },
    delete(url, params, apiversion='v1') {
        return axios({
            method: 'delete',
            baseURL: baseURL + '/' + apiversion,
            url,
            params,
            timeout: 5000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
    }
}
