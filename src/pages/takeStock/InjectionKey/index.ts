import type { InjectionKey, Ref } from 'vue'

// 盘点formData key
export const TakeStockFormDataKey = Symbol() as InjectionKey<Ref<{
    djbh: string,
    uname: string,
    rq: string,
    ckdm: string | number,
    kwdm: string | number,
    sptm: string,
    userid: string | number,
    djlx: string,
}>>