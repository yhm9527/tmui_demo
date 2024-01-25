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

// goodsDetail key
export const TakeStockGoodsDetailKey = Symbol() as InjectionKey<{
    goodsData: Ref<{
        Spdm: string,
        Spmc: string,
    }>,
    goodsSizeList: Ref<{
        Cmdm: string
        Cmmc: string
    }[]>,
    goodsColorList: Ref<{
        Ysdm: string
        Ysmc: string
    }[]>,
}>

// 统计
export const CountKey = Symbol() as InjectionKey<Ref<{
    number: number
    size: number
    latestShop: string
}>>