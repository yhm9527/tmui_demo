import { createSSRApp } from "vue";
import * as Pinia from 'pinia';
import tmui from "./tmui"
import App from "./App.vue";
// 这里引入你的配置文件，文件放哪承随便你自己定义。
import { config } from "./config"
export function createApp() {
  const app = createSSRApp(App);
  //合并配置到tmui中
  app.use(tmui, { ...config } as Tmui.tmuiConfig);
  return {
    app,
    Pinia
  };
}
