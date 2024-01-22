<script setup lang="ts">
    import { ref, reactive, watchEffect, computed, inject } from "vue"
    import { TakeStockFormDataKey } from "../InjectionKey"
    import { useFetch } from "@/tmui/tool/useFun/useFetch"
    import { DEFAULT_API, DEFAULT_FETCH_CONFIG } from "@/common/config"
    const params = reactive({
        search: "",
    })

    const formData = inject(TakeStockFormDataKey)

    // 商店列表
    const shopList = ref<any[]>()
    // 显示商店选择
    const show = ref(false)
    // 定义request
    const req = useFetch(DEFAULT_API + "/Work/GetCangku", {
        ...DEFAULT_FETCH_CONFIG,
        data: params,
    })

    req.getData()

    watchEffect(() => {
        if (req.data.value?.status == 200) {
            shopList.value = req.data.value?.data
        } else {
            shopList.value = []
        }
    })

    const activeValue = computed(() => {
        return (
            shopList.value?.find((item) => item.Khdm == formData?.value?.ckdm)
                ?.Khmc || ""
        )
    })
    const tempId = ref("")
    const showDrawer = () => {
        if (formData?.value?.djbh) {
            return
        }
        tempId.value = formData?.value?.ckdm as string
        show.value = true
    }
    const search = async () => {
        console.log("search", params.search)
        await req.getData()
    }
    const tempActive = (item: any) => {
        tempId.value = item.Khdm
    }
    const confirm = () => {
        if (!formData) {
            return
        }
        formData.value.ckdm = tempId.value
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
            :color="formData?.djbh ? 'grey' : 'black'"
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
                v-model="params.search"
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
                    :key="item.Khdm"
                    @click="tempActive(item)"
                >
                    <tm-text
                        class="px-20"
                        :color="tempId == item.Khdm ? 'blue' : ''"
                        >{{ item.Khmc }}</tm-text
                    >
                    <tm-divider
                        v-if="shopList && index < shopList.length - 1"
                    ></tm-divider>
                </view>
            </view>
        </view>
    </tm-drawer>
</template>

<style lang="scss" scoped></style>
