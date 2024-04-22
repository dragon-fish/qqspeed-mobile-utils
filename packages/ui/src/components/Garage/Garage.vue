<template lang="pug">
.overflow-auto.qq-speed-garage-wrapper
  .qq-speed-garage(bg='[url(/images/speedm-garage-common.jpg)] cover' border='1px solid #ccc' p='4' rounded='2' w='full' min-w='600px' aspect-ratio="2366/1500" shadow='md' relative overflow='hidden' text='#fff')

    //- 赛车主视觉图
    .car-primary-view(absolute bottom='15%' left='20%' w='40%' inline-block)
      img(:src='car.primaryView' :alt='`${car.name}.png`' w='full' h='auto' object-contain align-bottom)

    //- 赛车信息
    .right-panel(absolute top='0' right='0' bottom='0' w='480/1280' bg='[rgba(30,41,94,0.5)]' p='4' shadow='md #4c8fbd' border-l='2px solid #4c8fbd' flex='~ col' gap='4')
      //- 赛车标题
      GarageCarTitle(:car='car')

      //- 简介
      //- p {{ car.description || '(暂无简介)' }}

      //- 标签以及雷达图
      .adaptabilities-list(flex='~ wrap' gap='2')
        .adaptabilities-tag(v-if='car.adaptabilities?.length' v-for='i in car.getAdaptabilityNames()' :key='i') {{ i }}
        .adaptabilities-tag(v-else) 暂无

      div(m='x-auto' w='150px' max-w='full')
        CarPerformanceRadar(:car='car')

      .car-more-scroll(overflow='y-auto' flex='1 ~ col' m='x--4' p='x-4' gap='4')
        //- 赛车特性
        .car-super-ecu(v-if='car.superECU?.length')
          h3(p='y-1' w="50%" text='center' bg='#4876fe' skew='x-[-15deg]' inline-block m='b-2') 超级ECU
          ul
            li(v-for='ecu in car.superECU' :key='ecu.name')
              span(v-if='ecu.name') {{ ecu.name }}:
              span {{ ecu.description }}
        .car-skills(v-if='car.skills.length')
          h3(p='y-1' w="50%" text='center' bg='#4876fe' skew='x-[-15deg]' inline-block m='b-2') 特性
          ul
            li(v-for='skill in car.skills' :key='skill.name')
              span(v-if='skill.name') {{ skill.name }}:
              span {{ skill.description }}

        .flex-1

        .car-actions.flex
          .flex-1
            button 详细数据
          .flex-1
            button.primary 获取方式
</template>

<script setup lang="ts">
import {} from 'vue'
import { QCar, QCarAdaptability } from '@qqspeedm/core/lib/models'

const CarPerformanceRadar = defineAsyncComponent({
  loader: () => import('@/components/Garage/CarPerformanceRadar.vue'),
  loadingComponent: () =>
    h(
      'div',
      {
        class:
          'h-150px w-150px bg-[rgba(255,255,255,0.25)] flex justify-center items-center',
      },
      { default: () => '雷达图加载中...' }
    ),
})

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
    {
      label: 'WCWW',
      value: car.wcwwBoostSpeed,
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

.car-actions
  margin-top: 1rem
  gap: 1rem
  button
    width: 100%
    padding: 0.5rem
    border-radius: 0.25rem
    background-color: #8fa2b8
    color: #ffffff
    font-size: 1rem
    cursor: pointer
    transition: all 0.25s ease
    transform: skewX(-15deg)
    outline: none
    border: none
    font-weight: 700
    &:hover
      filter: brightness(1.1)
    &:active
      filter: brightness(0.9)
    &.primary
      background-color: #ffeb40
      color: #57340f
</style>
