<script setup lang="ts">
    import { ref, reactive } from "vue"
    import { onLoad } from "@dcloudio/uni-app"

    const isDetail = ref(false)

    const params = reactive({
        djbh: "",
        spdm: "",
    })
    onLoad((e: any) => {
        if (e.code) {
            params.djbh = e.code
        }
        if (e.isDetail) {
            isDetail.value = true
        }
    })

    const search = () => {
        console.log("search", params)
    }

    const deleteItem = () => {
        console.log("deleteItem")
    }
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
        <tm-sheet class="position-relative" :margin="[24, 12, 24, 12]">
            <tm-row
                :gutter="5"
                :column="2"
            >
                <tm-col align="start">
                    <tm-text label="单号: 2022-01-01"></tm-text>
                </tm-col>
                <tm-col align="start">
                    <tm-text label="单号: 2022-01-01"></tm-text>
                </tm-col>
            </tm-row>
            <tm-row
                :gutter="5"
                :column="3"
            >
                <tm-col align="start">
                    <tm-text label="数量: 1"></tm-text>
                </tm-col>
                <tm-col align="start">
                    <tm-text label="颜色: 红色"></tm-text>
                </tm-col>
                <tm-col align="start">
                    <tm-text label="颜色: XL"></tm-text>
                </tm-col>
            </tm-row>
            <tm-icon
                v-if="isDetail"
                class="position-absolute icon-delete"
                color="red"
                :font-size="30"
                name="tmicon-delete"
                @click="deleteItem"
            ></tm-icon>
        </tm-sheet>
    </tm-app>
</template>

<style lang="scss" scoped>
.position-relative {
    position: relative;
}
.position-absolute {
    position: absolute;
}
.icon-delete{
    right: 10rpx;
    top: 10rpx;
}
</style>
