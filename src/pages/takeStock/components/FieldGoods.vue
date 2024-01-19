<script setup lang="ts">
    import { ref } from "vue"
    import { useFetch } from "@/tmui/tool/useFun/useFetch"
    import { DEFAULT_API, DEFAULT_FETCH_CONFIG } from "@/common/config"
    const searchValue = ref("")
    const search = () => {
        console.log("search", searchValue.value);
    }
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
