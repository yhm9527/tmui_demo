<!--
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-09 14:32:52
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-27 14:52:01
 * @FilePath: \tmui_demo\src\pages\index\index.vue
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
-->
<script setup lang="ts">
    import { watch } from "vue"
    import { useFetch } from "@/tmui/tool/useFun/useFetch"
    import config from "@/common/config"
    const userInfo = uni.getStorageSync("userInfo")
    const reqShop = useFetch(config.API + "/Work/GetCangkuuser",{
        ...config.DEFAULT_FETCH_CONFIG,
        data: {
            login: userInfo.Dydm
        },
        showLoading: true
    })
    watch(
        ()=>reqShop.data.value,
        (val)=>{
            if(val?.status == 200){
                if(val?.data?.length){
                   // todo 存储商店/仓库地址
                   console.log('<<<shopData',val?.data[0]);
                   uni.setStorageSync('shopData',val?.data[0])
                }
            }
        }
    )
    reqShop.getData()
    const goTakeStock = () => {
        uni.navigateTo({ url: "/pages/takeStock/takeStock" })
    }
    const goSearch = () => {
        uni.navigateTo({ url: "/pages/search/search" })
    }
</script>

<template>
    <tm-app>
        <tm-navbar
            title="首页"
            hide-back
            hide-home
        >
        </tm-navbar>
        <tm-sheet>
			<tm-text :font-size="32" _class="text-weight-b" label="菜单"></tm-text>
			<tm-divider></tm-divider>
			<tm-grid :width="638" :col="4">
				<tm-grid-item :height="120" @click="goTakeStock">
					<tm-icon name="tmicon-edit" :font-size="50"></tm-icon>
					<tm-text _class="pt-10" :font-size="30" label="盘点"></tm-text>
				</tm-grid-item>
				<tm-grid-item :height="120" @click="goSearch">
					<tm-icon name="tmicon-search-plus" :font-size="50"></tm-icon>
					<tm-text _class="pt-10" :font-size="30" label="盘点查询"></tm-text>
				</tm-grid-item>
			</tm-grid>
		</tm-sheet>
    </tm-app>
</template>

<style lang="scss" scoped></style>
