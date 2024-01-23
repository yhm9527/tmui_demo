<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-09 10:57:44
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-23 22:34:34
 * @FilePath: \tmui_demo\src\pages\login\login.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref, reactive, computed, watchEffect, watch } from "vue"
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
    const showWin = ref(false)
    const checkDeviceStatus = ref(0) // 0未验证 1验证成功 2验证失败
    const checkDeviceMsg = ref("")
    const checkData = reactive({
        xlh: "",
    })
    const reqCheck = useFetch(DEFAULT_API + "/Jcinfo/Pdjsfzc", {
        ...DEFAULT_FETCH_CONFIG,
        data: checkData,
    })

    const registerFormData = reactive({
        xlh: "",
        gsmc: "",
    })
    const isRegister = ref(false)
    const reqRegister = useFetch(DEFAULT_API + "/Jcinfo/Pdjsqzc", {
        ...DEFAULT_FETCH_CONFIG,
        data: registerFormData,
    })

    // #ifdef H5
    checkData.xlh = "d42383549ac743edb873932e78cc076d11"
    registerFormData.xlh = "d42383549ac743edb873932e78cc076d11"
    // #endif

    // #ifdef APP-PLUS
    // todo 目前不检测当前设备
    plus.device.getInfo({
        success: (info) => {
            console.log("设备信息", info)
            checkData.xlh = info.uuid
            registerFormData.xlh = info.uuid
            // 验证当前设备是否可用
        },
        fail: (error) => {
            checkDeviceStatus.value = 2
            checkDeviceMsg.value = error.message
        },
    })
    // #endif

    watch(
        () => reqCheck.data.value,
        () => {
            if (reqCheck.data.value?.status == 200) {
                isRegister.value = false
                checkDeviceStatus.value = 1
                login()
            } else if (reqCheck.data.value?.status == 2) {
                showWin.value = true
                // 需要注册
                isRegister.value = true
            } else {
                showWin.value = true
                isRegister.value = false
                checkDeviceStatus.value = 2
                checkDeviceMsg.value = reqCheck.data.value?.msg || ""
            }
        }
    )

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
        if (loginData.value?.status != 200) {
            // 登录失败
            showWin.value = false
            msg.value?.show({
                model: "error",
                text: loginData.value?.msg || "登录失败",
            })
            return
        } else {
            msg.value?.show({
                model: "success",
                text: loginData.value?.msg || "登录成功",
            })
            uni.setStorageSync(
                "userInfo",
                JSON.parse(JSON.stringify(loginData.value?.data))
            )
            setTimeout(() => {
                uni.reLaunch({ url: "/pages/index/index" })
            }, 1300)
        }
    }

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

    const register = () => reqRegister.getData()
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
                    @click="reqCheck.getData()"
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
