<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-21 20:12:04
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-23 20:42:36
 * @FilePath: \tmui_demo\src\pages\search\search.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref, watchEffect, watch, provide } from "vue"
    import { onShow } from "@dcloudio/uni-app"
    import FormData from "./components/FormData.vue"
    import TakeStockItem from "./components/TakeStockItem.vue"
    import { useFetch } from "@/tmui/tool/useFun/useFetch"
    import config from "@/common/config"
    import tmMessage from "@/tmui/components/tm-message/tm-message.vue"
    import { FormDataKey, MsgKey, QueryKey } from "./InjectionKey"

    const msg = ref<InstanceType<typeof tmMessage> | null>(null)
    // 是否折叠
    const isFold = ref(false)
    provide(MsgKey, msg)
    const formData = ref({
        Strq: "", // 开始日期
        Edrq: "", //结束日期
        Ckdm: "", //商店代码
        Djbh: "", //单号
        Spdm: "", //商品代码
        Zdr: "", //制单人（录入）
        Zt: "", //状态（已提交 传 1  未提交传  0  全部  传空值）
    })
    provide(FormDataKey, formData)
    type TList = {
        rq: string
        djbh: string
        sddm: string
        sdmc: string
        kwdm: string
        kwmc: string
        zdrmc: string
        zt: string
        ztmc: string
        sl: number
    }
    const list = ref<TList[]>([])
    let reqListParams = { ...formData.value }
    const reqList = useFetch(config.API + "/Work/Getpdjtjcx", {
        ...config.DEFAULT_FETCH_CONFIG,
        method: "POST",
        data: reqListParams,
    })
    watch(
        () => reqList.loading.value,
        (val) => {
            if (val) {
                uni.showLoading({
                    title: "加载中",
                })
            } else {
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

    watchEffect(() => {
        reqListParams.Strq = formData.value.Strq
        reqListParams.Edrq = formData.value.Edrq
        reqListParams.Ckdm = formData.value.Ckdm
        reqListParams.Djbh = formData.value.Djbh
        reqListParams.Spdm = formData.value.Spdm
        reqListParams.Zdr = formData.value.Zdr
        reqListParams.Zt = formData.value.Zt
    })
    const query = () => {
        reqList.getData()
    }
    provide(QueryKey, query)

    onShow(() => {
        query()
    })
</script>
<script lang="ts">
    export default {
        name: "Search",
    }
</script>
<template>
    <tm-app _class="flex">
        <tm-navbar title="盘点查询" />
        <!-- 查询条件 可折叠 -->
        <tm-sheet
            :margin="[0, 0, 0, 12]"
            :padding="[12, 12]"
        >
            <view class="flex flex-row-center-between">
                <view
                    class="flex-1 flex"
                    @click="isFold = !isFold"
                >
                    <tm-icon
                        style="margin-left: 12rpx"
                        :font-size="24"
                        :name="
                            !isFold ? 'tmicon-angle-up' : 'tmicon-angle-down'
                        "
                        :color="isFold ? 'black' : 'green'"
                    ></tm-icon>
                    <tm-text
                        style="margin-left: 12rpx"
                        :color="isFold ? 'black' : 'green'"
                        :label="isFold ? '展开' : '收起'"
                    ></tm-text>
                </view>

                <tm-button
                    label="查询"
                    size="small"
                    color="green"
                    @click="query"
                ></tm-button>
            </view>
            <view v-show="!isFold">
                <form-data></form-data>
            </view>
        </tm-sheet>
        <!-- 列表 -->
        <take-stock-item
            v-for="(item, idx) in list"
            :key="idx"
            :data="item"
        ></take-stock-item>
        <tm-message
            ref="msg"
            :lines="2"
        ></tm-message>
    </tm-app>
</template>

<style lang="scss" scoped></style>
