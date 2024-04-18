<template lang="pug">
.app-container
  div(flex="~" gap='4' wrap='~' justify='center' align='center' p='4' bg='gray-100' min-h='full' max-w='full' shadow='md')
    CarUI(v-for='i in carList' :car="i")
</template>

<script setup lang="ts">
import {} from 'vue'
import {
  QCar,
  QCarAdaptability,
  QCarSkillBounsKind,
  QCarType,
} from '@qqspeedm/core/lib/models'

const nbCar = new QCar({
  name: '新手赛车',
  description: '你的下一辆赛车，何必是赛车？',
})

const tianXingZhe = new QCar({
  name: 'S-天行者',
  type: QCarType.A,
  description: '',
  baseSpeed: 202.5,
  cBoostSpeed: 313.9,
  wBoostSpeed: 243.1,
  cDurationSeconds: 3.11,
  wDurationSeconds: 0.69,
  basePower: 96.45,
  cBoostPower: 69.54,
  wBoostPower: 96.41,
  wBoostSpeedMultipliers: [0, 0, 0, 0],
  accelerationSeconds180: 3.242,
  turnAroundSeconds: 3.98,
  turnAroundSecondsWithStartUp: 4.08,
  driftAroundSeconds: 1.95,
  minSpeedWhileTurnAround: 193.5,
  adaptabilities: [QCarAdaptability.GRID],
  driftEnergyEfficiency: 121.78,
  skills: [
    {
      name: '',
      description:
        '氮气动力+18%。使用氮气即可达到CWW最高速度。每5次使用氮气，立即获得一个氮气。',
      icon: '',
    },
  ],
  boostSpouts: 5,
})

const keJiXianFeng = new QCar({
  name: '科技先锋',
  type: QCarType.A,
  description: '',
  baseSpeed: 201.1,
  cBoostSpeed: 271.2,
  wBoostSpeed: 249.7,
  cDurationSeconds: 3.12,
  wDurationSeconds: 0.7,
  basePower: 100.725,
  cBoostPower: 57.67,
  wBoostPower: 110.75,
  wBoostSpeedMultipliers: [0.1, 0.5, 0.3, 0],
  accelerationSeconds180: 3.142,
  turnAroundSeconds: 4.02,
  turnAroundSecondsWithStartUp: 4.12,
  driftAroundSeconds: 1.95,
  minSpeedWhileTurnAround: 191.7,
  adaptabilities: [QCarAdaptability.SORE],
  driftEnergyEfficiency: 120.278,
  skills: [
    {
      name: '',
      description: '每次落地立即获得12%集气且6.5秒内基础速度+10km/s',
      bounses: [
        {
          kind: QCarSkillBounsKind.ADDITION,
          attribute: 'baseSpeed',
          value: 10,
        },
      ],
    },
  ],
  boostSpouts: 5,
})

const carList = ref<QCar[]>([nbCar, tianXingZhe, keJiXianFeng])
</script>

<style scoped lang="sass"></style>
