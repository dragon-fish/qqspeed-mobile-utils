export interface GachaBannerBase {
  id: number
  name: string
  start: Date
  end: Date
  rateUp: number
  items: Array<string>
}

enum GachaType {
  UNDEFINED,
  // 紫晶
  PURPLE_CRISTAL,
  // 橙晶
  ORANGE_CRISTAL,
}

enum GachaRarity {
  FINAL_JACKPOT, // 最终大奖
  JACKPOT, // 大奖
  RARE, // 稀有
  TRASH, // 垃圾
}

export class GachaBanner {
  constructor(attrs: Partial<GachaBannerBase>) {
    Object.assign(this, attrs)
  }
}
