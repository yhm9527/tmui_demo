/*
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-18 18:37:51
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-27 21:10:13
 * @FilePath: \tmui_demo\src\common\config.ts
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
 */
let API = '';
let STATIC_API = '';
// #ifdef APP-PLUS
STATIC_API = import.meta.env.VITE_STATIC_API_URL
// #endif

// #ifdef H5
API = import.meta.env.VITE_API_H5_URL
STATIC_API = import.meta.env.VITE_API_H5_STATIC_URL
// #endif
console.log('DEFAULT_API', API)
console.log('DEFAULT_STATIC_API', STATIC_API)
const DEFAULT_FETCH_CONFIG: Tmui.fetchNetConfigType = {
    method: "GET",
    toastKey: "msg",
    pick: ['data', 'msg', 'status'],
    showToast: false,
    showLoading: false,
}


const config = {
    API,
    STATIC_API,
    DEFAULT_FETCH_CONFIG,
    updateApi() {
        // #ifdef APP-PLUS
        // todo 读取localStorage中的api地址
        const api = uni.getStorageSync('api')
        config.API = api+'/api'
        // #endif
        console.log('updateApi', config.API)
    }
}

export default config