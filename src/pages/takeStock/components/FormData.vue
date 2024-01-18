<script setup lang="ts">
    import { ref } from "vue"
    import FieldShop from "./FieldShop.vue"
    // 显示时间选择
    const showTimePickerView = ref(false)

    const formData = ref({
        time: "",
    })
</script>
<script lang="ts">
    export default {
        name: "FormData",
    }
</script>
<template>
    <tm-form
        ref="form"
        :label-width="200"
        v-model="formData"
    >
        <tm-form-item
            required
            label="日期"
            field="time"
        >
            <view
                @click="showTimePickerView = !showTimePickerView"
                class="flex flex-row flex-row-center-between"
            >
                <tm-text
                    :userInteractionEnabled="false"
                    :label="formData.time || '请选择日期'"
                ></tm-text>
                <tm-icon
                    :userInteractionEnabled="false"
                    :font-size="24"
                    name="tmicon-angle-right"
                ></tm-icon>
            </view>
        </tm-form-item>
        <tm-form-item
            required
            label="商店"
            field="time"
        >
            <field-shop></field-shop>
        </tm-form-item>
        <tm-form-item
            required
            label="柜组"
            field="time"
        >
        </tm-form-item>
        <tm-form-item
            required
            label="价格"
            field="time"
        >
        </tm-form-item>
        <tm-form-item
            required
            label="商品"
            field="time"
            :border="false"
        >
        </tm-form-item>
    </tm-form>
    <!-- 时间选择 -->
    <tm-time-picker
        v-model:show="showTimePickerView"
        v-model="formData.time"
        :defaultValue="formData.time"
        format="YYYY/MM/DD"
        v-model:model-str="formData.time"
    ></tm-time-picker>
</template>

<style lang="scss" scoped></style>
