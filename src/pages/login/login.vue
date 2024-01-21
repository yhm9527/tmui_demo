<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-09 10:57:44
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-21 23:39:47
 * @FilePath: \tmui_demo\src\pages\login\login.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref, reactive, computed, onMounted, watchEffect } from "vue"
    import { useFetch } from "@/tmui/tool/useFun/useFetch"
    import { DEFAULT_API, DEFAULT_FETCH_CONFIG } from "@/common/config"
    import tmMessage from "@/tmui/components/tm-message/tm-message.vue"
    // 禁用登录按钮
    const loginDisabled = ref(true)
    const showPassword = ref(false)
    const passwordType = computed<any>(() => {
        return showPassword.value ? "text" : "password"
    })
    // 显示遮罩层,验证当前设备
    const showWin = ref(true)
    const checkDeviceStatus = ref(0) // 0未验证 1验证成功 2验证失败
    const checkDeviceMsg = ref("")
    const checkData = reactive({
        xlh: "",
    })
    const reqCheck = useFetch(DEFAULT_API + "/Jcinfo/Pdjsfzc", {
        ...DEFAULT_FETCH_CONFIG,
        data: checkData,
    })

    // #ifdef H5
    checkData.xlh = "testuuid001"
    reqCheck.getData()
    // #endif

    // #ifdef APP-PLUS
    showWin.value = true
    plus.device.getInfo({
        success: (info) => {
            checkData.xlh = info.uuid
            // 验证当前设备是否可用
            reqCheck.getData()
        },
        fail: (error) => {
            checkDeviceStatus.value = 2
            checkDeviceMsg.value = error.message
        },
    })
    // #endif

    watchEffect(() => {
        if (reqCheck.error) {
            checkDeviceStatus.value = 2
            checkDeviceMsg.value = reqCheck.data.value?.msg || ""
        }
        if (reqCheck.data.value?.status == 200) {
            checkDeviceStatus.value = 1
        }
    })

    watchEffect(() => {
        if (checkDeviceStatus.value == 1) {
            setTimeout(() => {
                showWin.value = false
            }, 1300)
        }
    })

    const loginFormData = reactive({
        dydm: "",
        pasword: "",
    })

    // #ifdef H5
    loginFormData.dydm = "1898"
    loginFormData.pasword = "123"
    // #endif

    watchEffect(() => {
        loginDisabled.value = !loginFormData.dydm || !loginFormData.pasword
    })

    const msg = ref<InstanceType<typeof tmMessage> | null>(null)

    const {
        loading: loginLoading,
        data: loginData,
        getData,
    } = useFetch(DEFAULT_API + "/Jcinfo/Logindy", {
        ...DEFAULT_FETCH_CONFIG,
        data: loginFormData,
    })

    watchEffect(() => {
        if (loginLoading.value) {
            uni.showLoading({ title: "登录中..." })
        } else {
            uni.hideLoading()
        }
    })

    const login = async () => {
        await getData()
        if (loginData.value.status != 200) {
            // 登录失败
            msg.value?.show({ model: "error", text: loginData.value.msg })
            setTimeout(() => {
                uni.reLaunch({ url: "/pages/index/index" })
            }, 1300)
            return
        } else {
            msg.value?.show({ model: "success", text: loginData.value.msg })
            setTimeout(() => {
                uni.reLaunch({ url: "/pages/index/index" })
            }, 1300)
        }
    }
</script>
<script lang="ts">
    export default {
        name: "login",
    }
</script>
<template>
    <tm-app>
        <tm-overlay
            v-model:show="showWin"
            contentAnimation
            :overlayClick="false"
        >
            <view @click.stop="">
                <tm-spin
                    :load="checkDeviceStatus === 0"
                    tip="验证设备..."
                >
                    <tm-sheet
                        :width="400"
                        :height="400"
                    >
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
                            title="验证失败"
                            :sub-title="checkDeviceMsg || '请联系管理员'"
                        ></tm-result>
                    </tm-sheet>
                </tm-spin>
            </view>
        </tm-overlay>
        <view class="flex flex-col flex-center container">
            <view class="item">
                <tm-text
                    class="text-size-xl text-weight-b"
                    label="欢迎你登录..."
                    color="white"
                ></tm-text>
            </view>
            <view class="item mt-50">
                <tm-input
                    :round="25"
                    prefixColor="light-blue"
                    prefix="tmicon-user-fill"
                    placeholder="请输入店员号"
                    v-model="loginFormData.dydm"
                ></tm-input>
            </view>
            <view class="item mt-30">
                <tm-input
                    :round="25"
                    prefixColor="light-blue"
                    :type="passwordType"
                    show-password
                    prefix="tmicon-lock-fill"
                    placeholder="请输入密码"
                    v-model="loginFormData.pasword"
                >
                    <template #right>
                        <tm-icon
                            :name="
                                showPassword ? 'tmicon-eye' : 'tmicon-eye-slash'
                            "
                            @click="showPassword = !showPassword"
                        ></tm-icon>
                    </template>
                </tm-input>
            </view>
            <view class="item mt-30">
                <!-- 登录 -->
                <tm-button
                    :disabled="loginDisabled"
                    linear="right"
                    linearDeep="accent"
                    block
                    :round="25"
                    label="登录"
                    @click="login"
                ></tm-button>
            </view>
        </view>
        <tm-message
            ref="msg"
            :lines="2"
        ></tm-message>
    </tm-app>
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
        .item {
            width: 80vw;
        }
    }
</style>
