<script setup lang="ts">
    import {} from "vue"
    const showDetail = () => {
        console.log("showDetail")
        uni.navigateTo({
            url: "/pages/searchDetail/searchDetail?code="+"001",
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
                <tm-text label="日期: 2022-01-01"></tm-text>
            </tm-col>
            <tm-col align="start">
                <view class="flex">
                    <tm-text label="单号: "></tm-text>
                    <tm-text
                        color="blue"
                        style="margin-left: 8rpx"
                        label="2022-01-01"
                        @click="showDetail"
                    ></tm-text>
                </view>
            </tm-col>
            <tm-col align="start">
                <tm-text label="日期: 2022-01-01"></tm-text>
            </tm-col>
            <tm-col align="start">
                <tm-text label="单号: 2022-01-01"></tm-text>
            </tm-col>
            <tm-col align="start">
                <tm-text label="日期: 2022-01-01"></tm-text>
            </tm-col>
            <tm-col align="start">
                <tm-text label="单号: 2022-01-01"></tm-text>
            </tm-col>
        </tm-row>

        <view class="flex flex-row-center-between">
            <tm-button
                label="提交"
                size="small"
                color="green"
            ></tm-button>
            <tm-button
                label="修改"
                size="small"
            ></tm-button>
            <tm-button
                label="提交"
                size="small"
                color="red"
            ></tm-button>
        </view>
    </tm-sheet>
</template>

<style lang="scss" scoped></style>
