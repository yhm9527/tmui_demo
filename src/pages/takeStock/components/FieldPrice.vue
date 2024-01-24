<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-19 13:46:24
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-22 17:04:10
 * @FilePath: \tmui_cli_demo\src\pages\takeStock\components\FieldPrice.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref, inject, watch, computed } from "vue"
    import { useFetch } from "@/tmui/tool/useFun/useFetch"
    import config from "@/common/config"
    import { TakeStockFormDataKey } from "../InjectionKey"

    const show = ref(false)
    const list = ref<any[]>([])

    const formData = inject(TakeStockFormDataKey)
    const req = useFetch(config.API + "/Work/Getspjg", {
        ...config.DEFAULT_FETCH_CONFIG,
    })

    req.getData()

    watch(
        () => req.data.value?.data,
        (val) => {
            list.value = val
        }
    )

    const tempId = ref("")
    const activeValue = computed(() => {
        return list.value.find((item) => item.jgdm === formData?.value.djlx)?.jgmc || ""
    })

    const showDrawer = () => {
        if (formData?.value?.djbh) {
            return
        }
        tempId.value = formData?.value.djlx as string
        show.value = true
    }
    const tempActive = (item: any) => {
        tempId.value = item.jgdm
    }
    const confirm = () => {
        if (!formData) {
            return
        }
        formData.value.djlx = tempId.value
    }
</script>
<script lang="ts">
    export default {
        name: "FieldPrice",
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
            :label="activeValue || '请选择价格'"
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
            <view
                class="flex-1 flex flex-col py-20"
                style="overflow-y: auto"
            >
                <view
                    v-for="(item, index) in list"
                    :key="item.jgdm"
                    @click="tempActive(item)"
                >
                    <tm-text
                        class="px-20"
                        :color="tempId === item.jgdm ? 'blue' : ''"
                        >{{ item.jgmc }}</tm-text
                    >
                    <tm-divider v-if="index < list.length - 1"></tm-divider>
                </view>
            </view>
        </view>
    </tm-drawer>
</template>

<style lang="scss" scoped></style>
