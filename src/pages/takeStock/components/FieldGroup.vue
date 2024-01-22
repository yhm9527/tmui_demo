<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-19 11:35:31
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-22 17:03:01
 * @FilePath: \tmui_cli_demo\src\pages\takeStock\components\FieldGroup.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { ref, inject, watch, computed } from "vue"
    import { useFetch } from "@/tmui/tool/useFun/useFetch"
    import { DEFAULT_API, DEFAULT_FETCH_CONFIG } from "@/common/config"
    import { TakeStockFormDataKey } from "../InjectionKey"

    const formData = inject(TakeStockFormDataKey)
    const show = ref(false)
    const list = ref<any[]>([])
    const params = {
        ckdm: "",
    }
    const req = useFetch(DEFAULT_API + "/Work/GetKuwei", {
        ...DEFAULT_FETCH_CONFIG,
        data: params,
    })

    watch(
        () => formData?.value.ckdm,
        (val) => {
            params.ckdm = val as string
            req.getData()
        }
    )

    watch(
        () => req.data.value?.data,
        (val) => {
            list.value = val
        }
    )

    const tempId = ref("")
    const activeValue = computed(() => {
        return (
            list.value.find((item) => item.Kwdm == formData?.value.kwdm)
                ?.Kwmc || ""
        )
    })

    const showDrawer = () => {
        if(formData?.value.djbh){
            return
        }
        tempId.value = formData?.value.kwdm as string
        show.value = true
    }
    const tempActive = (item: any) => {
        tempId.value = item.Kwdm
    }
    const confirm = () => {
        if (!formData) {
            return
        }
        formData.value.kwdm = tempId.value
    }
</script>
<script lang="ts">
    export default {
        name: "FieldGroup",
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
            :label="activeValue || '请选择柜组'"
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
                    :key="item.Kwdm"
                    @click="tempActive(item)"
                >
                    <tm-text
                        class="px-20"
                        :color="tempId == item.Kwdm ? 'blue' : ''"
                        >{{ item.Kwmc }}</tm-text
                    >
                    <tm-divider v-if="index < list.length - 1"></tm-divider>
                </view>
            </view>
        </view>
    </tm-drawer>
</template>

<style lang="scss" scoped></style>
