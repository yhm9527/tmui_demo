<script setup lang="ts">
    import { reactive, watch, ref, inject } from "vue"
    import { MsgKey, QueryKey } from "../InjectionKey"
    import { useFetch } from "@/tmui/tool/useFun/useFetch"
    import config from "@/common/config"
    type Props = {
        data: {
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
    }
    const props = defineProps<Props>()
    const msg = inject(MsgKey)
    const query = inject(QueryKey)
    const userInfo: { [key: string]: string } = uni.getStorageSync("userInfo")

    const submitParams = reactive({
        djbh: props.data.djbh,
        userid: userInfo.Dydm,
        name: userInfo.Dymc,
    })

    // 提交
    const reqSubmit = useFetch(config.API + "/Work/Subdjbh", {
        ...config.DEFAULT_FETCH_CONFIG,
        data: submitParams,
    })

    // 删除
    const reqDel = useFetch(config.API + "/Work/Delpdjdjbh", {
        ...config.DEFAULT_FETCH_CONFIG,
        data: {
            djbh: props.data.djbh,
            zdrid: userInfo.Dydm,
        },
    })

    const showDetail = () => {
        uni.navigateTo({
            url: "/pages/searchDetail/searchDetail?code=" + props.data.djbh,
        })
    }

    const submit = () => reqSubmit.getData()
    watch(
        () => reqSubmit.data.value,
        (val) => {
            if (val?.status == 200) {
                msg?.value?.show({
                    text: val?.msg || "提交成功",
                    model: "success",
                })
                query && query()
            } else {
                msg?.value?.show({
                    text: val?.msg || "提交失败",
                    model: "error",
                })
            }
        }
    )
    const del = () => reqDel.getData()
    watch(
        () => reqDel.data.value,
        (val) => {
            if (val?.status == 200) {
                msg?.value?.show({
                    text: val?.msg || "删除成功",
                    model: "success",
                })
                query && query()
            } else {
                msg?.value?.show({
                    text: val?.msg || "删除失败",
                    model: "error",
                })
            }
        }
    )

    const goEdit = () => {
        uni.navigateTo({
            url: "/pages/takeStock/takeStock?code=" + props.data.djbh,
        })
    }
</script>
<script lang="ts">
    export default {
        name: "TakeStockItem",
    }
</script>
<template>
    <tm-sheet :margin="[24, 12]">
        <tm-row
            :gutter="5"
            :column="2"
        >
            <tm-col align="start">
                <tm-text :label="`日期: ${props.data.rq}`"></tm-text>
            </tm-col>
            <tm-col align="start">
                <view class="flex">
                    <tm-text label="单号: "></tm-text>
                    <tm-text
                        color="blue"
                        style="margin-left: 8rpx"
                        :label="props.data.djbh"
                        @click="showDetail()"
                    ></tm-text>
                </view>
            </tm-col>
            <tm-col align="start">
                <tm-text :label="`商店: ${props.data.sdmc}`"></tm-text>
            </tm-col>
            <tm-col align="start">
                <tm-text :label="`库位: ${props.data.kwmc}`"></tm-text>
            </tm-col>
        </tm-row>
        <tm-row
            :gutter="5"
            :column="3"
        >
            <tm-col align="start">
                <tm-text :label="`制单人: ${props.data.zdrmc}`"></tm-text>
            </tm-col>
            <tm-col align="start">
                <tm-text :label="`数量: ${props.data.sl}`"></tm-text>
            </tm-col>
            <tm-col align="start">
                <tm-text :label="`状态: ${props.data.ztmc}`"></tm-text>
            </tm-col>
        </tm-row>

        <view
            class="flex flex-row-center-between"
            v-if="props.data.zt == '0'"
        >
            <tm-button
                label="提交"
                size="small"
                color="green"
                :margin="[0, 0]"
                @click="submit()"
            ></tm-button>
            <tm-button
                label="修改"
                size="small"
                :margin="[0, 0]"
                @click="goEdit()"
            ></tm-button>
            <tm-button
                label="删除"
                size="small"
                color="red"
                :margin="[0, 0]"
                @click="del()"
            ></tm-button>
        </view>
    </tm-sheet>
</template>

<style lang="scss" scoped></style>
