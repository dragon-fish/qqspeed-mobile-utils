<template lang="pug">
.qq-speed-garage(bg='[url(/images/speedm-garage-common.jpg)] cover' border='1px solid #ccc' p='4' rounded='2' w='full' aspect-ratio="2366/1500" shadow='md' relative overflow='hidden')
  .right-scroll(absolute top='0' right='0' bottom='0' w='1/3' bg='[rgba(30,41,94,,0.5)]' p='4' rounded='2' shadow='md' overflow='auto')
    h2
      .car-class(:class='[`class-${car.class}`]') {{ car.class }}
      .car-name {{ car.name }}
    p {{ car.description || '-' }}
    CarPerformanceRadar(:car='car')
    h2 速度
    table
      tr(v-for='(item, index) in speedStatistics' :key='index')
        td {{ item.label }}
        td {{ item.value }}
    h2 动力
    table
      tr(v-for='(item, index) in powerStatistics' :key='index')
        td {{ item.label }}
        td {{ item.value }}
</template>

<script setup lang="ts">
import {} from 'vue'
import { QCar } from '@qqspeedm/core/lib/models'

const props = defineProps<{
  car: QCar
}>()

const speedStatistics = computed(() => {
  const car = props.car
  const data = [
    {
      label: '基础速度',
      value: car.baseSpeed,
    },
    {
      label: '氮气最高速',
      value: car.cBoostSpeed,
    },
    {
      label: '小喷最高速',
      value: car.wBoostSpeed,
    },
    {
      label: 'WC',
      value: car.wcBoostSpeed,
    },
    {
      label: 'CW',
      value: car.cwBoostSpeed,
    },
    {
      label: 'WCW',
      value: car.wcwBoostSpeed,
    },
    {
      label: 'CWW',
      value: car.cwwBoostSpeed,
    },
  ]
  if (car.wBoostSpeedMultipliers && car.wBoostSpeedMultipliers[3]) {
    data.push({
      label: 'CWWW',
      value: car.cwwwBoostSpeed,
    })
    data.push({
      label: 'WCWWW',
      value: car.wcwwwBoostSpeed,
    })
  }
  return data
})

const powerStatistics = computed(() => {
  const car = props.car
  return [
    {
      label: '基础动力',
      value: car.basePower,
    },
    {
      label: '剩余基础动力',
      value: car.leftBasePower,
    },
    {
      label: '氮气动力',
      value: car.cBoostPower,
    },
    {
      label: '小喷动力',
      value: car.wBoostPower,
    },
    {
      label: '叠喷总动力',
      value: car.combinedPower,
    },
  ]
})

const allSkillBouns = computed(() => {
  const car = props.car
  return car.skills.reduce((acc, skill) => {
    if (skill.bounses === QCarSkillBounsKind.SPEED) {
      // acc += skill.bounses.
    }
    return acc
  }, [])
})

const maxCwwWithEffects = computed(() => {
  const car = props.car
  // const
})
</script>

<style scoped lang="sass"></style>
