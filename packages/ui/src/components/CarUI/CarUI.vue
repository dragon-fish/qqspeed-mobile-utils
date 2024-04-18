<template lang="pug">
.qq-speed-car(prose bg='white' border='1px solid #ccc' p='4' rounded='~' w='400px' max-w='full' shadow='md')
  h2 {{ car.name }}
  p {{ car.attr.description || '-' }}
  h2 速度
  table
    tr(v-for='(item, index) in speedStatistics' :key='index')
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
  if (car.attr.wBoostSpeedMultipliers && car.attr.wBoostSpeedMultipliers[3]) {
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

const allSkillBouns = computed(() => {
  const car = props.car
  return car.skills.reduce((acc, skill) => {
    if (skill.bounsKind === QCarSkillBounsKind.SPEED) {
      acc += skill.bouns
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
