<script setup lang="ts">
    import { ref, inject } from "vue"
    import { TakeStockFormDataKey } from "../InjectionKey"
    const formData = inject(TakeStockFormDataKey)
    const searchValue = ref("")
    const search = () => {
        if(!formData){
            return
        }
        formData.value.sptm = searchValue.value
    }

    // #ifdef H5
    searchValue.value = "a13349"
    // #endif
</script>
<script lang="ts">
    export default {
        name: "FieldGoods",
    }
</script>
<template>
    <tm-input
        v-model="searchValue"
        placeholder="请输入商品"
        :searchWidth="120"
        prefix="tmicon-search"
        searchLabel="搜索"
        @search="search"
    ></tm-input>
</template>

<style lang="scss" scoped></style>
