<script setup lang="ts">
    import { ref } from "vue"
    import { useFetch } from "@/tmui/tool/useFun/useFetch"
    import { DEFAULT_API, DEFAULT_FETCH_CONFIG } from "@/common/config"
    // 显示商店选择
    const show = ref(false)
    // 商店列表
    const shopList = ref<any[]>([
        { word: "香蕉", id: 1 },
        { word: "其它水果", id: 2 },
        { word: "苹果", id: 3 },
        { word: "越南水果", id: 4 },
        { word: "越南水果", id: 22 },
        { word: "越南水果", id: 222 },
        { word: "越南水果", id: 2222 },
        { word: "越南水果", id: 22222 },
        { word: "越南水果", id: 222222 },
    ])
    const searchValue = ref("")
    const activeId = ref(0)
    const activeValue = ref("")
    const tempId = ref(0)
    const tempValue = ref("")
    const showDrawer = () => {
        tempId.value = activeId.value
        tempValue.value = activeValue.value
        show.value = true
    }
    const search = () => {
        console.log("search", searchValue.value)
    }
    const tempActive = (item: any) => {
        tempId.value = item.id
        tempValue.value = item.word
    }
    const confirm = () => {
        activeId.value = tempId.value
        activeValue.value = tempValue.value
    }
</script>
<script lang="ts">
    export default {
        name: "FieldShop",
    }
</script>
<template>
    <view
        @click="showDrawer"
        class="flex flex-row flex-row-center-between"
    >
        <tm-text
            :userInteractionEnabled="false"
            :label="activeValue || '请选择商店'"
        ></tm-text>
        <tm-icon
            :userInteractionEnabled="false"
            :font-size="24"
            name="tmicon-angle-right"
        ></tm-icon>
    </view>
    <tm-drawer
        placement="bottom"
        v-model:show="show"
        @ok="confirm"
    >
        <view
            class="px-20 flex flex-col"
            style="height: 100%"
        >
            <tm-input
                v-model="searchValue"
                :searchWidth="120"
                @search="search"
                prefix="tmicon-search"
                searchLabel="搜索"
            ></tm-input>
            <view
                class="flex-1 flex flex-col py-20"
                style="overflow-y: auto"
            >
                <view
                    v-for="(item, index) in shopList"
                    :key="item.id"
                    @click="tempActive(item)"
                >
                    <tm-text
                        class="px-20"
                        :color="tempId == item.id ? 'blue' : ''"
                        >{{ item.word }}</tm-text
                    >
                    <tm-divider v-if="index < shopList.length - 1"></tm-divider>
                </view>
            </view>
        </view>
    </tm-drawer>
</template>

<style lang="scss" scoped></style>
