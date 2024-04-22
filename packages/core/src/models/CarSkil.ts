import { QCarBase } from './Car'
import { QGameMode } from './GameMode'

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
