<script setup lang="ts">
    import {} from "vue"
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
                    <tm-text label="数量 :"></tm-text>
                    <tm-text
                        _class="ml-10 text-weight-b"
                        label="20"
                        color="red"
                    ></tm-text>
                </view>
            </tm-col>
            <tm-col>
                <view class="flex">
                    <tm-text label="款数 :"></tm-text>
                    <tm-text
                        _class="ml-10 text-weight-b"
                        label="5"
                        color="red"
                    ></tm-text>
                </view>
            </tm-col>
        </tm-row>
        <tm-divider />
        <!-- 商品,保存 -->
        <view class="flex flex-row-center-between">
            <tm-text label="商品: 100021 / 衣服衣服衣服"></tm-text>
            <tm-button
                label="保存"
                :margin="[0, 0]"
                color="green"
                size="small"
            ></tm-button>
        </view>
        <!-- 颜色选择 -->
        <tm-row
            :column="5"
            :gutter="5"
        >
            <tm-col v-for="i in 6" :key="i">
                <tm-button
                    color="grey"
                    label="白色"
                    :margin="[0, 10, 0, 0]"
                    size="small"
                ></tm-button>
            </tm-col>
        </tm-row>
        <!-- 尺码,数量 -->
        <tm-row :gutter="5" :column="3">
            <tm-col>
                <tm-text label="尺码"></tm-text>
            </tm-col>
            <tm-col>
                <tm-text label="数量"></tm-text>
            </tm-col>
        </tm-row>
        <tm-row :gutter="5" :column="3" v-for="i in 4" :key="i" :margin="[0,10,0,0]">
            <tm-col>
                <tm-text label="M"></tm-text>
            </tm-col>
            <tm-col>
                <tm-stepper :defaultValue="0"></tm-stepper>
            </tm-col>
        </tm-row>
    </tm-sheet>
</template>

<style lang="scss" scoped></style>
