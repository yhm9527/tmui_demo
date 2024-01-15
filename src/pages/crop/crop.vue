<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-10 10:56:16
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-10 15:18:19
 * @FilePath: \tmui_cli_demo\src\pages\crop\crop.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref } from "vue"
    import BtCropper from "@/components/BtCropper/bt-cropper.vue"
    const cropper = ref<InstanceType<typeof BtCropper>>()
    const img = ref(
        "https://img0.baidu.com/it/u=1641416437,1150295750&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800"
    )
    const cropImg = ref("")
    const showCrop = ref(false)

    const handle = (type: 1 | 2 | 3 | 4) => {
        switch (type) {
            case 1: // 撤销
                cropper.value?.undo()
                break
            case 2: // 重做
                cropper.value?.resume()
                break
            case 3: // 裁剪&保存
                cropper.value
                    ?.crop()
                    .then((res: string) => {
                        cropImg.value = res
                        showCrop.value = false
                    })
                    .catch((err: any) => {
                        console.log("err", err)
                    })
                break
        }
    }
</script>

<template>
    <tm-app>
        <tm-navbar title="裁剪" />
        <tm-sheet
            :round="3"
            :shadow="2"
        >
            <tm-button
                size="small"
                @click="showCrop = true"
                >裁剪</tm-button
            >
            <tm-divider></tm-divider>
            <view class="flex flex-row flex-row-center-between">
                <tm-image
                    model="aspectFit"
                    preview
                    :width="300"
                    :height="200"
                    :src="img"
                ></tm-image>
                <tm-image
                    model="aspectFit"
                    v-show="cropImg"
                    preview
                    :width="300"
                    :height="200"
                    :src="cropImg"
                ></tm-image>
            </view>
        </tm-sheet>

        <tm-modal
            mask
            title="裁剪图片"
            :round="4"
            :height="800"
            v-model:show="showCrop"
        >
            <template #default>
                <view class="flex flex-center pt-20">
                    <bt-cropper
                        ref="cropper"
                        :containerSize="{ width: '500', height: '600' }"
                        :imageSrc="img"
                    ></bt-cropper>
                </view>
            </template>
            <template #button>
                <view
                    class="fulled px-50 flex flex-row flex-row-center-between"
                >
                    <tm-button
                        color="orange"
                        size="small"
                        :shadow="0"
                        label="撤销"
                        @click="handle(1)"
                    ></tm-button>
                    <tm-button
                        color="purple"
                        size="small"
                        :shadow="0"
                        label="重做"
                        @click="handle(2)"
                    ></tm-button>
                    <tm-button
                        color="green"
                        size="small"
                        :shadow="0"
                        label="裁剪&保存"
                        @click="handle(3)"
                    ></tm-button>
                </view>
            </template>
        </tm-modal>
    </tm-app>
</template>

<style lang="scss" scoped></style>
