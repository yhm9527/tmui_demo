<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-22 09:08:01
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-23 10:38:53
 * @FilePath: \tmui_cli_demo\src\pages\searchDetail\searchDetail.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref, reactive, watch } from "vue"
    import { onLoad } from "@dcloudio/uni-app"
    import { useFetch } from "@/tmui/tool/useFun/useFetch"
    import { DEFAULT_API, DEFAULT_FETCH_CONFIG } from "@/common/config"
    import tmMessage from "@/tmui/components/tm-message/tm-message.vue"
    const msg = ref<InstanceType<typeof tmMessage> | null>(null)
    const isDelete = ref(false)
    const show = ref(false)
    const params = reactive({
        djbh: "",
        spdm: "",
    })
    type Item = {
        id: number
        djbh: string
        spdm: string
        spmc: string
        ysmc: string
        cmmc: string
        sl: number
    }
    const tempItem = ref<Item>()
    const list = ref<Item[]>([])
    const reqList = useFetch(DEFAULT_API + "/Work/Sppdquerydh", {
        ...DEFAULT_FETCH_CONFIG,
        data: params,
    })
    const delParams = reactive({
        id: 0,
        djbh: "",
        spdm: "",
    })
    const reqDelete = useFetch(DEFAULT_API + "/Work/Delspycmx", {
        ...DEFAULT_FETCH_CONFIG,
        data: delParams,
    })
    onLoad((e: any) => {
        if (e.code) {
            params.djbh = e.code
            reqList.getData()
        }
        if (e.isDelete) {
            isDelete.value = true
        }
    })
    const search = () => {
        reqList.getData()
    }
    const showDelete = (item: Item) => {
        tempItem.value = { ...item }
        show.value = true
    }
    const deleteItem = () => {
        if (!tempItem.value) {
            return
        }
        delParams.id = tempItem.value?.id
        delParams.djbh = tempItem.value?.djbh
        delParams.spdm = tempItem.value?.spdm
        reqDelete.getData()
    }
    watch(
        () => reqList.loading.value,
        (val) => {
            if(val){
                uni.showLoading({
                    title: "加载中",
                })
            }else{
                uni.hideLoading()
            }
        }
    )
    watch(
        () => reqList.data.value,
        (val) => {
            if (val?.status == 200) {
                list.value = val?.data?.length ? val?.data : []
            } else {
                list.value = []
            }
        }
    )
    watch(
        () => reqDelete.data.value,
        (val) => {
            if (val?.status == 200) {
                // success
                msg.value?.show({
                    text: "删除成功",
                    model: "success",
                })
                reqList.getData()
            } else {
                // fail
                msg.value?.show({
                    text: val?.msg || "删除失败",
                    model: "error",
                })
            }
        }
    )
</script>
<script lang="ts">
    export default {
        name: "SearchDetail",
    }
</script>
<template>
    <tm-app>
        <tm-navbar title="详情" />
        <tm-sheet :margin="[0, 0, 0, 12]">
            <tm-input
                v-model="params.spdm"
                placeholder="请输入商品代码"
                :searchWidth="120"
                @search="search"
                prefix="tmicon-search"
                searchLabel="搜索"
            ></tm-input>
        </tm-sheet>
        <tm-sheet
            v-for="item in list"
            :key="item.id"
            class="position-relative"
            :margin="[24, 12, 24, 12]"
        >
            <tm-row
                :gutter="5"
                :column="2"
            >
                <tm-col align="start">
                    <tm-text :label="`商品代码: ${item.spdm}`"></tm-text>
                </tm-col>
                <tm-col align="start">
                    <tm-text :label="`商品: ${item.spmc}`"></tm-text>
                </tm-col>
            </tm-row>
            <tm-row
                :gutter="5"
                :column="3"
            >
                <tm-col align="start">
                    <tm-text :label="`数量: ${item.sl}`"></tm-text>
                </tm-col>
                <tm-col align="start">
                    <tm-text :label="`颜色: ${item.ysmc}`"></tm-text>
                </tm-col>
                <tm-col align="start">
                    <tm-text :label="`尺码: ${item.cmmc}`"></tm-text>
                </tm-col>
            </tm-row>
            <tm-icon
                v-if="isDelete"
                class="position-absolute icon-delete"
                color="red"
                :font-size="30"
                name="tmicon-delete"
                @click="showDelete(item)"
            ></tm-icon>
        </tm-sheet>
        <tm-modal
            color="white"
            okColor="red"
            cancelColor="red"
            okLinear="left"
            okText="确定"
            splitBtn
            title="提示"
            content="你确定要删除吗?"
            v-model:show="show"
            :height="300"
            :overlayClick="false"
            @ok="deleteItem"
        ></tm-modal>
        <tm-message
            ref="msg"
            :lines="2"
        ></tm-message>
    </tm-app>
</template>

<style lang="scss" scoped>
    .position-relative {
        position: relative;
    }
    .position-absolute {
        position: absolute;
    }
    .icon-delete {
        right: 10rpx;
        top: 10rpx;
    }
</style>
