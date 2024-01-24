<script setup lang="ts">
    import { ref, inject, reactive, watchEffect, computed } from "vue"
    import { FormDataKey } from "../InjectionKey"
    import { useFetch } from "@/tmui/tool/useFun/useFetch"
    import { DEFAULT_API, DEFAULT_FETCH_CONFIG } from "@/common/config"

    const formData = inject(FormDataKey)

    // 显示商店选择
    const show = ref(false)
    // 商店列表
    const shopList = ref<any[]>([])

    const params = reactive({
        search: "",
    })

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
    const activeId = ref("")
    const tempId = ref("")
    const activeValue = computed(() => {
        return (
            shopList.value?.find((item) => item.Khdm == formData?.value?.Ckdm)
                ?.Khmc || ""
        )
    })

    const showDrawer = () => {
        tempId.value = formData?.value?.Ckdm as string
        show.value = true
    }
    const search = () => {
        req.getData()
    }
    const tempActive = (item: any) => {
        tempId.value = item.Khdm
    }
    const confirm = () => {
        if (!formData) {
            return
        }
        formData.value.Ckdm = tempId.value
    }
    const systemInfo = ref(uni.getSystemInfoSync())
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
        :height="1000"
        @ok="confirm"
    >
        <view class="flex flex-col flex-col-center-center fulled fulled-height">
            <view class="fulled">
                <tm-input
                    :margin="[20, 0, 20, 20]"
                    v-model="params.search"
                    :searchWidth="120"
                    @search="search"
                    prefix="tmicon-search"
                    searchLabel="搜索"
                ></tm-input>
            </view>
            <tm-virtual-list
                :scrollViewInTo="''"
                :width="systemInfo?.windowWidth"
                :height="800"
                :data="shopList"
                :itemHeight="80"
            >
                <template v-slot:default="{ data }">
                    <tm-sheet
                        :style="{ width: systemInfo?.windowWidth + 'px' }"
                        :border="1"
                        borderDirection="bottom"
                        :height="80"
                        _class="flex flex-row flex-row-center-start"
                        :padding="[0, 0]"
                        :margin="[0, 0]"
                        v-for="(item, index) in data"
                        :key="index"
                        @click="tempActive(item)"
                    >
                        <tm-text
                            class="px-20"
                            :color="tempId == item.Khdm ? 'blue' : ''"
                            :label="item.Khmc"
                        >
                        </tm-text>
                    </tm-sheet>
                </template>
            </tm-virtual-list>
        </view>
    </tm-drawer>
</template>

<style lang="scss" scoped></style>
