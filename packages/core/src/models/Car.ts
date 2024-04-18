import { QGameMode } from './GameMode'

export interface QCarBase {
  readonly id?: number
  readonly name: string
  isSkin?: boolean
  type: QCarType // 赛车等级
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
  boostSpouts: number // 喷口数量
}

export class QCarBase {
  constructor(init: Partial<QCarBase>) {
    Object.assign(this, {
      ...QCarBase.createDefaultAttributes(),
      ...init,
    })
  }

  static createDefaultAttributes() {
    return {
      name: '新手赛车',
      type: QCarType.D,
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
      driftEnergyEfficiency: 0,
      skills: [],
      boostSpouts: 1,
    } as QCarBase
  }
}

export enum QCarType {
  D = 'D',
  C = 'C',
  B = 'B',
  A = 'A',
  T = 'T',
  S = 'S',
}

export enum QCarAdaptability {
  SORE, // 腾空车
  GRID, // 抓地车
  STARTUP, // 起步车
  CHASE, // 后追车
  DRIFT, // 漂移车
  TURN, // 转向车
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
  extends() {}

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
