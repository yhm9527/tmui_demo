<script setup lang="ts">
    import { inject, ref, watch, computed } from "vue"
    import {
        TakeStockFormDataKey,
        TakeStockGoodsDetailKey,
        CountKey,
    } from "../InjectionKey"
    import { useFetch } from "@/tmui/tool/useFun/useFetch"
    import config from "@/common/config"
    import tmMessage from "@/tmui/components/tm-message/tm-message.vue"
    const msg = ref<InstanceType<typeof tmMessage> | null>(null)
    const formData = inject(TakeStockFormDataKey)
    const goodsDetail = inject(TakeStockGoodsDetailKey)
    const count = inject(CountKey)
    const activeColor = ref("")
    const tempList = ref<
        {
            Cmdm: string
            Ysdm: string
            Sl: number
        }[]
    >([])

    watch(
        () => goodsDetail?.goodsData.value.Spdm,
        () => {
            activeColor.value = ""
            initTempList()
        }
    )

    const initTempList = () => {
        tempList.value = []
        goodsDetail?.goodsColorList.value.forEach((item) => {
            goodsDetail?.goodsSizeList.value.forEach((item2) => {
                tempList.value.push({
                    Ysdm: item.Ysdm,
                    Cmdm: item2.Cmdm,
                    Sl: 0,
                })
            })
        })
    }

    const getIdx = computed(() => {
        return (cmdm: string, ysdm: string) => {
            return tempList.value.findIndex(
                (item) => item.Cmdm == cmdm && item.Ysdm == ysdm
            )
        }
    })

    const params = {
        djbh: "",
        name: "",
        rq: "",
        ckdm: "",
        kwdm: "",
        userid: "",
        djlx: "",
        spdm: "",
        listyc: [] as any[],
    }

    const req = useFetch(config.API + "/Work/Savepdsr", {
        ...config.DEFAULT_FETCH_CONFIG,
        method: "POST",
        data: params,
    })

    const save = () => {
        const list = tempList.value.reduce((a, b) => {
            if (b.Sl > 0) {
                a.push({
                    ...b,
                })
            }
            return a
        }, [] as any[])
        if (!list.length) {
            msg.value?.show({
                model: "error",
                text: "请输入数量",
            })
        }
        params.djbh = formData?.value.djbh as string
        params.ckdm = formData?.value.ckdm as string
        params.kwdm = formData?.value.kwdm as string
        params.rq = formData?.value.rq as string
        params.userid = formData?.value.userid as string
        params.djlx = formData?.value.djlx as string
        params.name = formData?.value.uname as string
        params.spdm = goodsDetail?.goodsData.value.Spdm as string
        params.listyc = list
        req.getData()
    }

    watch(
        () => req.data.value,
        (newVal) => {
            if (newVal?.status == 200) {
                // success
                if (count) {
                    count.value.number = newVal?.data?.sl
                    count.value.size = newVal?.data?.ks
                    count.value.latestShop = newVal?.data?.spxx
                }
                initTempList()
                uni.showToast({
                    title: req.data.value?.msg || "保存成功",
                    icon: "success",
                })
            } else {
                // fail
                uni.showToast({
                    title: req.data.value?.msg || "保存失败",
                    icon: "error",
                })
            }
        }
    )
</script>
<script lang="ts">
    export default {
        name: "Entering",
    }
</script>
<template>
    <tm-sheet
        :margin="[24, 0, 24, 24]"
        :round="[5]"
    >
        <!-- 数量,款数 -->
        <tm-row
            :column="2"
            :gutter="5"
        >
            <tm-col>
                <view class="flex">
                    <tm-text
                        :font-size="32"
                        label="数量 :"
                    ></tm-text>
                    <tm-text
                        :font-size="32"
                        _class="ml-10 text-weight-b"
                        :label="count?.number"
                        color="red"
                    ></tm-text>
                </view>
            </tm-col>
            <tm-col>
                <view class="flex">
                    <tm-text
                        :font-size="32"
                        label="款数 :"
                    ></tm-text>
                    <tm-text
                        :font-size="32"
                        _class="ml-10 text-weight-b"
                        :label="count?.size"
                        color="red"
                    ></tm-text>
                </view>
            </tm-col>
        </tm-row>
        <tm-row
            v-if="count?.latestShop"
            :column="1"
        >
            <tm-col align="start">
                <tm-text
                    :font-size="32"
                    :label="count?.latestShop"
                ></tm-text>
            </tm-col>
        </tm-row>
        <tm-divider :margin="[0, 10]" />
        <!-- 商品,保存 -->
        <view class="flex flex-row-center-between">
            <tm-text
                :font-size="32"
                :label="`商品: ${goodsDetail?.goodsData.value.Spmc}`"
            ></tm-text>
            <tm-button
                :font-size="32"
                label="保存"
                :margin="[0, 0]"
                :disabled="!activeColor"
                color="green"
                size="small"
                @click="save"
            ></tm-button>
        </view>
        <!-- 颜色选择 -->
        <tm-row
            :column="5"
            :gutter="5"
        >
            <tm-col
                v-for="i in goodsDetail?.goodsColorList.value"
                :key="i.Ysdm"
            >
                <tm-button
                    :font-size="32"
                    :color="activeColor == i.Ysdm ? 'blue' : 'grey'"
                    :label="i.Ysmc"
                    :margin="[0, 10, 0, 0]"
                    size="small"
                    @click="activeColor = i.Ysdm"
                ></tm-button>
            </tm-col>
        </tm-row>
        <!-- 尺码,数量 -->
        <tm-row
            :margin="[0, 10, 0, 0]"
            v-if="activeColor"
            :gutter="5"
            :column="4"
        >
            <tm-col align="start">
                <tm-text
                    :font-size="32"
                    label="尺码"
                ></tm-text>
            </tm-col>
            <tm-col
                align="start"
                :col="2"
            >
                <tm-text
                    :font-size="32"
                    label="数量"
                ></tm-text>
            </tm-col>
        </tm-row>
        <tm-row
            v-if="activeColor"
            :gutter="5"
            :column="4"
            v-for="i in goodsDetail?.goodsSizeList.value"
            :key="i.Cmdm"
            :margin="[0, 10, 0, 0]"
        >
            <tm-col align="start">
                <tm-text
                    :font-size="32"
                    :label="i.Cmmc"
                ></tm-text>
            </tm-col>
            <tm-col
                :col="2"
                align="start"
            >
                <tm-stepper
                    :defaultValue="0"
                    v-model="tempList[getIdx(i.Cmdm, activeColor)].Sl"
                ></tm-stepper>
            </tm-col>
        </tm-row>
        <tm-message
            ref="msg"
            :lines="2"
        ></tm-message>
    </tm-sheet>
</template>

<style lang="scss" scoped></style>
