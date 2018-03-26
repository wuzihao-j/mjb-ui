// 2018/1/9 by DKZ

import axios from 'axios';
import {config} from './config'

function get (params, opts) {
    let _opts = opts || {};
    return axios({
        url: params.url,
        method: 'get',
        baseURL: params.base_url || config.host,
        headers: {
            'Content-Type': _opts.contentType || 'application/x-www-form-urlencoded',
        },
        params: params.data,
        withCredentials:true,
    });
}

function post (params, opts) {
    let _opts = opts || {};
    return axios({
        url: params.url,
        method: 'post',
        baseURL: params.base_url || config.host,
        headers: {
            'Content-Type': _opts.contentType || 'application/x-www-form-urlencoded',
        },
        params:params.data,
        // data: params.data,
        withCredentials:true,
    });
}

function ajax (params, opts) {
   
    let _opts = opts || {};
    return axios({
        url: params.url,
        method: 'post',
        baseURL: params.base_url || config.host,
        headers: {
            'Content-Type': _opts.contentType || 'application/json',
        },
        data: params.data,
        withCredentials:true,
    });
}

function resolve (resp, clback) {
    var data = resp.data;
    if (resp.status == 200) {
        clback && clback(data);
    }
    return data;
}

export {get,post,resolve,ajax}