<template lang="pug">
.qq-speed-garage(bg='[url(/images/speedm-garage-common.jpg)] cover' border='1px solid #ccc' p='4' rounded='2' w='full' aspect-ratio="2366/1500" shadow='md' relative overflow='hidden' text='#fff')

  //- 赛车主视觉图
  .car-primary-view(absolute bottom='20%' left='25%' w='40%' h='45%')
    img(:src='`/images/cars/${car.name}.png`' :alt='`${car.name}.png`' w='full' h='full' object-fit='contain' style='background: #f0f6' inline-block)

  //- 赛车信息
  .right-scroll(absolute top='0' right='0' bottom='0' w='480/1280' bg='[rgba(30,41,94,0.5)]' p='4' shadow='md #4c8fbd' border-l='2px solid #4c8fbd' flex='~ col' gap='4')
    //- 赛车标题
    h2.car-name-title(m='b-2 x--6' flex='~' items='center' skew='x-[-15deg]')
      .car-title__class(:class='[`class-${car.class}`]' text='8 italic' bg='#4876fe' p='x-4 y-2') {{ car.class }}
      .car-title__name(text='italic 5' font="700" m='l-4') {{ car.name }}

    //- 简介
    p {{ car.description || '(暂无简介)' }}

    //- 标签以及雷达图
    .flex(gap='4')
      .flex-1
        .adaptabilities-list(flex='~ 1' gap='2')
          .adaptabilities-tag(v-if='car.adaptabilities?.length' v-for='i in car.adaptabilities' :key='i') {{ adaptabilitieNameMap[i] || '暂无' }}
          .adaptabilities-tag(v-else) 暂无

      div(style='flex: 2')
        CarPerformanceRadar(:car='car')
</template>

<script setup lang="ts">
import {} from 'vue'
import { QCar, QCarAdaptability } from '@qqspeedm/core/lib/models'

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

const adaptabilitieNameMap = {}
</script>

<style scoped lang="sass">
.car-name-title
  background-image: repeating-linear-gradient(-90deg, #1e295ecc, #1e295ecc 2px, #69e8ff22 2px, #69e8ff22 4px)
  .car-title__class
    padding-right: 1.5rem
    background-image: linear-gradient(to left, #69e8ff, #69e8ff 2px, rgba(0,0,0,0) 2px, transparent 8px, #69e8ff 8px, #69e8ff 12px, transparent 12px, transparent 16px, #69e8ff 16px, #4876fe)
    font-weight: 900
    &.class-D
      color: #e2e7ec

.adaptabilities-tag
  display: inline-block
  padding: 0.25rem 0.5rem
  border-radius: 0.25rem
  background-color: #276592
  color: #ffffff
  font-size: 0.75rem
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  max-width: 100%
  height: auto
</style>
