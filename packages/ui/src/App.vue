<template lang="pug">
.app-container
  .flex(
    flex='~ col',
    gap='4',
    wrap='~',
    p='4',
    bg='gray-100',
    min-h='full',
    max-w='full',
    w='960px',
    m='x-auto',
    shadow='md'
  )
    Garage(v-for='i in carList', :car='i')
</template>

<script setup lang="ts">
import '@/styles/index.sass'
import {} from 'vue'
import {
  QCar,
  QCarAdaptability,
  QCarSkillBounsKind,
  QCarClass,
} from '@qqspeedm/core/lib/models'

const Garage = defineAsyncComponent(() => import('@/components/Garage'))

const nbCar = new QCar({
  name: '新手赛车',
  description: '你的下一辆赛车，何必是赛车？',
})

const tianXingZhe = new QCar({
  name: 'S-天行者',
  class: QCarClass.A,
  primaryView:
    'https://patchwiki.biligame.com/images/qqspeed/c/ce/dswxj4ssynhnedc2xeoxva1x9cezwpm.png',
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
  adaptabilities: [QCarAdaptability.GRIP],
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
  primaryView:
    'https://patchwiki.biligame.com/images/qqspeed/5/53/qgyxy5wk6f4sqvnxk6ovdf909318rrx.png',
  class: QCarClass.A,
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
  adaptabilities: [QCarAdaptability.SOAR],
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

const moYingQingLong = new QCar({
  name: '末影青龙',
  class: QCarClass.T,
  primaryView:
    'https://patchwiki.biligame.com/images/qqspeed/6/64/ggnzinmmyumba7h31i6og3b6xzecscc.png',
  description: '',
  baseSpeed: 204,
  cBoostSpeed: 279.8,
  wBoostSpeed: 249.5,
  cDurationSeconds: 3.12,
  wDurationSeconds: 0.83,
  basePower: 103.16,
  cBoostPower: 70.3,
  wBoostPower: 112.67,
  wBoostSpeedMultipliers: [0.1, 0.5, 0.3, 0.225],
  accelerationSeconds180: 3.025,
  turnAroundSeconds: 3.94,
  turnAroundSecondsWithStartUp: 4.04,
  driftAroundSeconds: 1.95,
  minSpeedWhileTurnAround: 195.5,
  adaptabilities: [
    QCarAdaptability.SOAR,
    QCarAdaptability.MECHA,
    QCarAdaptability.NATIONAL_RECORD,
  ],
  driftEnergyEfficiency: 125.908,
  skills: [
    {
      name: '',
      description:
        '小喷时长+0.1s。CWW喷后的首个小喷可额外提升最高速度。每秒自动集气3%。每9次使用小喷，7秒内基础速度+8km/s，自动集气翻倍。',
      bounses: [
        {
          kind: QCarSkillBounsKind.ADDITION,
          attribute: 'wDurationSeconds',
          value: 0.1,
        },
        {
          kind: QCarSkillBounsKind.ADDITION,
          attribute: 'baseSpeed',
          value: 8,
        },
      ],
    },
  ],
  boostSpouts: 7,
})

const tongYaoXuQu = new QCar({
  name: '童谣序曲',
  class: QCarClass.A,
  primaryView:
    'https://patchwiki.biligame.com/images/qqspeed/4/43/cf6jpjlo2zy9496ph9vlru81miisfjd.png',
  description: '',
  baseSpeed: 202.6,
  cBoostSpeed: 275,
  wBoostSpeed: 245.6,
  cDurationSeconds: 3.1,
  wDurationSeconds: 0.71,
  basePower: 103.34,
  cBoostPower: 67.64,
  wBoostPower: 110.63,
  wBoostSpeedMultipliers: [0.15, 0.65, 0.15, 0],
  accelerationSeconds180: 3.04,
  turnAroundSeconds: 4.02,
  turnAroundSecondsWithStartUp: 4.12,
  driftAroundSeconds: 1.95,
  minSpeedWhileTurnAround: 193.2,
  adaptabilities: [
    // QCarAdaptability.S,
  ],
  driftEnergyEfficiency: 117.825,
  skills: [
    {
      name: '',
      description:
        'wcw喷可达到cww喷极限速度，每10次使用小喷，5秒内基础最高速度+6km/h，氮气动力+7%。',
      bounses: [],
    },
  ],
  boostSpouts: 6,
})

const carList = ref<QCar[]>([
  nbCar,
  tianXingZhe,
  keJiXianFeng,
  moYingQingLong,
  tongYaoXuQu,
])
</script>

<style scoped lang="sass"></style>
