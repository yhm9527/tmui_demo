import type { InjectionKey, Ref } from 'vue'
import tmMessage from "@/tmui/components/tm-message/tm-message.vue"
// formData key
export const FormDataKey = Symbol() as InjectionKey<Ref<{
    Strq: string // 开始日期
    Edrq: string //结束日期
    Ckdm: string //商店代码
    Djbh: string //单号
    Spdm: string //商品代码
    Zdr: string //制单人（录入）
    Zt: string //状态（已提交 传 1  未提交传  0  全部  传空值）
}>>

// msg key
export const MsgKey = Symbol() as InjectionKey<Ref<InstanceType<typeof tmMessage> | null>>