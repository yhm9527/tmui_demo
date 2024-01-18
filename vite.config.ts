/*
 * @Author: leslie 2483677516@qq.com
 * @Date: 2024-01-17 21:07:25
 * @LastEditors: leslie 2483677516@qq.com
 * @LastEditTime: 2024-01-17 22:50:44
 * @FilePath: \tmui_demo\vite.config.ts
 * @Description:
 *
 * Copyright (c) 2024 by 2483677516@qq.com, All Rights Reserved.
 */
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path"
// import Components from 'unplugin-vue-components/vite'
// https://vitejs.dev/config/
export default defineConfig({
	build: {
		target: "es6"
	},
	resolve: {
		alias: [
			{
				find: "@",
				replacement: resolve(__dirname, 'src')
			}
		]
	},
	server: {
		port: 1314,
		proxy: {
			'/api': {
				target: 'https://xxcx.myhxsmbh.com:4438/api',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		}
	},
	plugins: [
		uni(),
		vueJsx()
	]
});
