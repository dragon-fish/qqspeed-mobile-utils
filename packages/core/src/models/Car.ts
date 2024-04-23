import { QGameMode } from './GameMode'

export interface QCarBase {
  readonly id?: number
  readonly name: string
  isSkin?: boolean
  primaryView?: string
  class: QCarClass // 赛车等级
  description: string
  baseSpeed: number // 平跑最高速
  cBoostSpeed: number // 氮气最高速
  wBoostSpeed: number // 小喷最高速
  cDurationSeconds: number
  wDurationSeconds: number
  basePower: number // 基础动力
  cBoostPower: number // 氮气动力
  wBoostPower: number // 小喷动力
  /**
   * 小喷速度倍率
   * ```
   * (w)c(w)(w)(w)
   *  ↑   ↑  ↑  ↑
   *  0   1  2  3
   * ```
   */
  wBoostSpeedMultipliers: number[]
  accelerationSeconds180: number // 0-180加速时间
  minSpeedWhileTurnAround: number // 转向最低速度
  turnAroundSeconds: number // 转向一周耗时（稳定）
  turnAroundSecondsWithStartUp: number // 转向一周耗时（含起始时间）
  driftAroundSeconds: number // 漂移一周耗时
  adaptabilities: QCarAdaptability[] // 适应性
  driftEnergyEfficiency: number // 集气效率
  skills: QCarSkill[] // 特性
  superECU?: QCarSuperECU[]
  boostSpouts: number // 喷口数量
}

export class QCarBase {
  constructor(init: Partial<QCarBase>) {
    const dafaultCar = QCarBase.createDefaultAttributes()
    const validKeys = Reflect.ownKeys(dafaultCar)

    const initCopy = { ...init }
    Reflect.ownKeys(initCopy).forEach((key) => {
      if (!validKeys.includes(key)) {
        // @ts-ignore
        delete initCopy[key]
      }
    })

    Object.assign(this, {
      ...dafaultCar,
      ...initCopy,
    })
  }

  static createDefaultAttributes() {
    return {
      name: '新手赛车',
      class: QCarClass.D,
      primaryView:
        'https://patchwiki.biligame.com/images/qqspeed/f/f6/s27qpmjt3uousv6jf5trsvkegibbut0.png',
      description: '',
      baseSpeed: 183,
      cBoostSpeed: 252.5,
      wBoostSpeed: 220.6,
      cDurationSeconds: 3,
      wDurationSeconds: 0.59,
      basePower: 84.7,
      cBoostPower: 47,
      wBoostPower: 84.6,
      wBoostSpeedMultipliers: [0.1, 0.5, 0.3, 0],
      accelerationSeconds180: 4.18,
      turnAroundSeconds: 4.02,
      turnAroundSecondsWithStartUp: 4.12,
      driftAroundSeconds: 2.06,
      minSpeedWhileTurnAround: 164.1,
      adaptabilities: [],
      driftEnergyEfficiency: 100,
      skills: [],
      superECU: [],
      boostSpouts: 1,
    } as QCarBase
  }
}

export enum QCarClass {
  // 赛车
  D = 'D',
  C = 'C',
  B = 'B',
  A = 'A',
  T = 'T',
  S = 'S',
  // 摩托车
  M1 = 'M1',
  M2 = 'M2',
  // 滑板车
  L1 = 'L1',
  L2 = 'L2',
}

export enum QCarType {
  RACING_CAR,
  MOTORCYCLE,
  SKATEBOARD,
}

export enum QCarAdaptability {
  SOAR, // 腾空
  GRIP, // 抓地
  STARTUP, // 起步
  CHASE, // 后追
  DRIFT, // 漂移
  TURN, // 转向
  COMBACT, // 实战
  C_BOOST_MORPH, // 氮气变形
  S_LEAGUE, // S-联赛
  LEGEND, // 联赛传奇
  NATIONAL_RECORD, // 国服
  MECHA, // 机甲
}

export interface QCarSkill {
  icon?: string
  name?: string
  description: string
  bounses?: QCarSkillBouns[]
}

export interface QCarSuperECU extends QCarSkill {
  kindOfGameMode: QGameMode
}

export enum QCarSkillBounsKind {
  ADDITION,
  MULTIPLIER,
}
export interface QCarSkillBouns {
  kind: QCarSkillBounsKind
  attribute: keyof QCarBase
  value: number
}

export class QCar extends QCarBase {
  constructor(
    init: ({ name: string } & Partial<Omit<QCarBase, 'name'>>) | QCarBase
  ) {
    super(init)
  }
  static newFromNewbieCar() {
    return new QCar({
      name: '新手赛车',
    })
  }
  extends(attrs: Partial<QCarBase>) {
    return new QCar({
      ...this,
      ...attrs,
    })
  }
  toJSON() {
    const validKeys = Reflect.ownKeys(QCarBase.createDefaultAttributes())
    const obj: any = {}
    validKeys.forEach((key) => {
      if (Reflect.has(this, key)) {
        // @ts-ignore
        obj[key] = this[key]
      }
    })
    return obj
  }
  toString() {
    return `${this.name} - ${this.class}级赛车`
  }

  get type() {
    if ([QCarClass.M1, QCarClass.M2].includes(this.class)) {
      return QCarType.MOTORCYCLE
    } else if ([QCarClass.L1, QCarClass.L2].includes(this.class)) {
      return QCarType.SKATEBOARD
    }
    return QCarType.RACING_CAR
  }
  isTypeOf(type: QCarType) {
    return this.type === type
  }

  static ADAPTABILITY_NAME_MAP = {
    [QCarAdaptability.SOAR]: '腾空',
    [QCarAdaptability.GRIP]: '抓地',
    [QCarAdaptability.STARTUP]: '起步',
    [QCarAdaptability.CHASE]: '后追',
    [QCarAdaptability.DRIFT]: '漂移',
    [QCarAdaptability.TURN]: '转向',
    [QCarAdaptability.COMBACT]: '实战',
    [QCarAdaptability.C_BOOST_MORPH]: '氮气变形',
    [QCarAdaptability.S_LEAGUE]: 'S-联赛',
    [QCarAdaptability.LEGEND]: '联赛传奇',
    [QCarAdaptability.NATIONAL_RECORD]: '国服',
    [QCarAdaptability.MECHA]: '机甲',
  }
  getAdaptabilityNames() {
    const list = this.adaptabilities.map(
      (a) => QCar.ADAPTABILITY_NAME_MAP[a] || a
    )
    if (this.boostSpouts >= 5) {
      const num = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九']
      list.unshift(`${num[this.boostSpouts]}喷`)
    }
    return list
  }

  /**
   * 剩余基础动力
   * 当速度达到平跑最高速度时，剩余基础动力恒为基础动力的 20%
   * 对于赛车各类特性中的基础动力加成，均基于剩余基础动力计算
   */
  get leftBasePower() {
    // 只保留小数点后两位，四舍五入
    return parseFloat((this.basePower * 0.2).toFixed(2))
  }

  /**
   * 叠喷总动力
   * 叠喷总动力 = 剩余基础动力 + 氮气动力 + 小喷动力
   */
  get combinedPower() {
    return this.leftBasePower + this.cBoostPower + this.wBoostPower
  }
  get cwwBoostPower() {
    return this.combinedPower
  }

  /**
   * 计算叠喷速度，部分赛车有额外的特性加成
   *
   * 有一些赛车拥有比较独特的特性，例如：
   * - 天行者：c 等于 cww 最高速度，可以把它的小喷提速乘区写为 [0, 0, 0, 0]
   * - 有一些车的 wcw 速度等于 cww 速度，我们可以覆写 wcwBoostSpeed 的 getter
   * ```ts
   * Object.defineProperty(someCar, 'wcwBoostSpeed', {
   *   get() {
   *     return this.cwwBoostSpeed
   *   }
   * })
   * ```
   */
  computeBoostSpeed(wBoostIndexes: number[]) {
    return this.computeSpeedByWBoostMultiplier(
      this.computeWBoostMultiplier(wBoostIndexes)
    )
  }
  computeSpeedByWBoostMultiplier(wSpeedMultiplier = 0) {
    return (
      this.cBoostSpeed + (this.wBoostSpeed - this.baseSpeed) * wSpeedMultiplier
    )
  }
  computeWBoostMultiplier(wBoostIndexes: number[]) {
    wBoostIndexes = [...new Set(wBoostIndexes)]
    return wBoostIndexes.reduce(
      (acc, i) => acc + (this.wBoostSpeedMultipliers[i] || 0),
      0
    )
  }

  get wcBoostSpeed() {
    return this.computeBoostSpeed([0])
  }
  get cwBoostSpeed() {
    return this.computeBoostSpeed([1])
  }
  get wcwBoostSpeed() {
    return this.computeBoostSpeed([0, 1])
  }
  get cwwBoostSpeed() {
    return this.computeBoostSpeed([1, 2])
  }
  get wcwwBoostSpeed() {
    return this.computeBoostSpeed([0, 1, 2])
  }
  get cwwwBoostSpeed() {
    return this.computeBoostSpeed([1, 2, 3])
  }
  get wcwwwBoostSpeed() {
    return this.computeBoostSpeed([0, 1, 2, 3])
  }
}
