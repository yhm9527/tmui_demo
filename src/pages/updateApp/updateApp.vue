<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-27 20:03:06
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-27 23:08:12
 * @FilePath: \tmui_demo\src\pages\updateApp\updateApp.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref, reactive, watch } from "vue"
    import { useFetch } from "@/tmui/tool/useFun/useFetch"
    import config from "@/common/config"
    import tmMessage from "@/tmui/components/tm-message/tm-message.vue"
    // #ifdef APP-PLUS
    // @ts-ignore
    import AppUpgrade from "@/uni_modules/app-upgrade/js_sdk/index.js"
    // #endif

    const msg = ref<InstanceType<typeof tmMessage>>()
    const systemInfo = uni.getSystemInfoSync()
    const params = {
        xlh: "",
        ver: systemInfo.appVersionCode,
    }
    const registerFormData = reactive({
        xlh: "",
        gsmc: "",
    })
    // #ifdef H5
    params.xlh = "a4465e26a6f79545"
    // #endif
    const req = useFetch(config.STATIC_API + "/Work/PdjAPPupdate", {
        ...config.DEFAULT_FETCH_CONFIG,
        showLoading: true,
        data: params,
    })

    // #ifdef APP-PLUS
    plus.device.getInfo({
        success: (info) => {
            checkData.xlh = info.uuid
            params.xlh = info.uuid
            registerFormData.xlh = info.uuid
            reqCheck.getData()
        },
        fail: (error) => {
            msg.value?.show({
                model: "error",
                text: error.message || "获取设备信息失败",
            })
        },
    })
    // #endif

    const checkData = reactive({
        xlh: "",
    })
    const reqCheck = useFetch(config.STATIC_API + "/Jcinfo/Pdjsfzc", {
        ...config.DEFAULT_FETCH_CONFIG,
        data: checkData,
    })

    const reqRegister = useFetch(config.STATIC_API + "/Jcinfo/Pdjsqzc", {
        ...config.DEFAULT_FETCH_CONFIG,
        data: registerFormData,
        showLoading: true,
    })
    const register = () => reqRegister.getData()
    const [showWin, isRegister, checkDeviceStatus, checkDeviceMsg] = [
        ref(false),
        ref(false),
        ref(0),
        ref(""),
    ]
    // 验证设备是否注册
    watch(
        () => reqCheck.loading.value,
        (val) => {
            if (val) {
                uni.showLoading({
                    title: "验证中...",
                })
            } else {
                uni.hideLoading()
            }
        }
    )
    watch(
        () => reqCheck.data.value,
        (val) => {
            console.log("验证设备", val)
            if (val?.status == 200) {
                isRegister.value = false
                showWin.value = false
                // todo 获取对应的api地址并更新
                if (val?.data) {
                    uni.setStorageSync("api", val?.data)
                    config.updateApi()
                } else {
                    msg.value?.show({
                        model: "error",
                        text: "未获取到对应的接口地址",
                    })
                    return
                }
                // todo 检测更新
                req.getData()
            } else if (val?.status == 2) {
                showWin.value = true
                // 需要注册
                isRegister.value = true
            } else {
                showWin.value = true
                isRegister.value = false
                checkDeviceStatus.value = 2
                checkDeviceMsg.value = val?.msg || ""
            }
        }
    )

    // 注册
    watch(
        () => reqRegister.data.value,
        (val) => {
            if (val?.status == 200) {
                // success
                msg.value?.show({
                    model: "success",
                    text: val?.msg || "注册成功",
                })
                setTimeout(() => {
                    reqCheck.getData()
                }, 1500)
            } else {
                // error
                msg.value?.show({
                    model: "error",
                    text: val?.msg || "注册失败",
                })
            }
        }
    )

    // 验证是否需要更新
    watch(
        () => req.data.value,
        (val) => {
            console.log("验证是否需要更新", val);
            if (val?.status == 1) {
                // 需要更新
                // #ifdef APP-PLUS
                AppUpgrade(async () => {
                    return {
                        changelog: "",
                        status: 1,
                        path: val?.data,
                    }
                }, 1)
                // #endif
            } else if (val?.status == 200) {
                // 不需要更新
                // 直接进入登录页面
                uni.reLaunch({ url: "/pages/login/login" })
            } else {
                // error
                msg.value?.show({
                    model: "error",
                    text: val?.msg || "请联系管理员处理",
                })
            }
        }
    )
</script>
<script lang="ts">
    export default {
        name: "updateApp",
    }
</script>
<template>
    <view class="container">
        <tm-overlay
            v-model:show="showWin"
            contentAnimation
            :overlayClick="false"
        >
            <view @click.stop="">
                <tm-spin
                    v-if="!isRegister"
                    :load="checkDeviceStatus === 0"
                    tip="验证设备..."
                >
                    <tm-sheet
                        :width="400"
                        :height="400"
                        style="position: relative"
                    >
                        <tm-icon
                            name="tmicon-redo"
                            style="position: absolute; right: 20rpx"
                            @click="reqCheck.getData()"
                        ></tm-icon>
                        <tm-result
                            v-if="checkDeviceStatus === 1"
                            color="green"
                            status="success"
                            :showBtn="false"
                            :clickDisabled="false"
                            title="验证成功"
                            sub-title="欢迎使用"
                        ></tm-result>
                        <tm-result
                            v-else-if="checkDeviceStatus === 2"
                            color="red"
                            status="error"
                            :showBtn="false"
                            :clickDisabled="false"
                            title="验证未通过"
                            :sub-title="checkDeviceMsg || '请联系管理员'"
                        ></tm-result>
                    </tm-sheet>
                </tm-spin>
                <tm-sheet
                    v-else
                    :width="400"
                    :height="250"
                >
                    <view
                        class="fulled fulled-height flex flex-col flex-center"
                    >
                        <tm-text
                            label="申请注册"
                            class="text-size-xl text-weight-b"
                        ></tm-text>
                        <view
                            class="fulled flex-1 flex flex-row-center-between"
                        >
                            <tm-input
                                v-model="registerFormData.gsmc"
                                class="fulled"
                                prefixLabel="公司"
                                placeholder="请输入公司"
                                :margin="[0, 24]"
                                :maxlength="10"
                            ></tm-input>
                        </view>
                        <tm-button
                            label="申请"
                            size="small"
                            @click="register()"
                        ></tm-button>
                    </view>
                </tm-sheet>
            </view>
        </tm-overlay>
    </view>
    <tm-message
        ref="msg"
        :lines="2"
    ></tm-message>
</template>

<style lang="scss" scoped>
    .container {
        height: 100vh;
        width: 100%;
        // 渐变背景 浅蓝到深蓝
        background: linear-gradient(
            180deg,
            rgba(0, 0, 255, 0.1) 0%,
            rgba(0, 0, 255, 0.5) 50%,
            rgba(0, 0, 255, 0.1) 100%
        );
    }
</style>
