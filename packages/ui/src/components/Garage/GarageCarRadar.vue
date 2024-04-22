<template lang="pug">
VChart.speedm-car-performance-radar(:option='option', ref='chartRef')
</template>

<script setup lang="ts">
import {} from 'vue'
import { QCar } from '@qqspeedm/core/lib/models'
import { type EChartsOption } from 'echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart } from 'echarts/charts'
import { TooltipComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'

const props = defineProps<{
  car: QCar
}>()

use([CanvasRenderer, RadarChart, TooltipComponent])

// provide(THEME_KEY, 'dark')

const toFixed2 = (num: number) => parseFloat(num.toFixed(2))

const option = computed<EChartsOption>(() => {
  const car = props.car

  const hasExtraWBoost =
    car.wBoostSpeedMultipliers && car.wBoostSpeedMultipliers[3]
  const maxSpeed = toFixed2(
    hasExtraWBoost ? car.wcwwwBoostSpeed : car.wcwwBoostSpeed
  )

  const maxDriftMS = 2500
  const minDriftMS = 1750
  const driftPercent = toFixed2(
    ((car.driftAroundSeconds * 1000 - maxDriftMS) / (minDriftMS - maxDriftMS)) *
      100
  )

  const maxTurnMS = 4200
  const minTurnMS = 3900
  const turnPercent = toFixed2(
    ((car.turnAroundSeconds * 1000 - maxTurnMS) / (minTurnMS - maxTurnMS)) * 100
  )
  const totalPersistence = toFixed2(car.cDurationSeconds + car.wDurationSeconds)

  return {
    tooltip: {
      show: true,
      trigger: 'item',
      position: 'left',
    },
    backgroundColor: 'transparent',
    radar: {
      indicator: [
        { name: '漂移', max: 100 },
        { name: '延续', max: 6 },
        { name: '动力', max: 250 },
        { name: '转向', max: 100 },
        { name: '集气', max: 130, min: 80 },
        { name: '速度', max: 350, min: 240 },
      ],
      radius: '60%',
      axisName: {
        distance: 10,
      },
    },
    series: [
      {
        name: '',
        type: 'radar',
        tooltip: {
          trigger: 'item',
          formatter(payload) {
            return (
              `<pre>` +
              [
                `漂移一周：${car.driftAroundSeconds}s`,
                `喷氮时间：${car.wDurationSeconds}s/${car.cDurationSeconds}s`,
                `叠喷动力：${car.combinedPower}`,
                `转向一周：${car.turnAroundSeconds}s`,
                `集气效率：${car.driftEnergyEfficiency}`,
                `
极限速度：${maxSpeed}km/s (${hasExtraWBoost ? `wcwww` : `wcww`})
`,
              ]
                .map((i) => i.trim())
                .join('\n') +
              `</pre>`
            )
          },
        },
        data: [
          {
            value: [
              driftPercent,
              totalPersistence,
              car.combinedPower,
              turnPercent,
              car.driftEnergyEfficiency,
              maxSpeed,
            ],
            name: '',
          },
        ],
        symbol: 'none',
        lineStyle: {
          color: '#2ab0c5',
        },
        areaStyle: {
          color: '#2ab0c5',
        },
      },
    ],
  } as EChartsOption
})

const chartRef = ref<any>()
const observer = useResizeObserver(chartRef, ([entry]) => {
  const target = entry.target as HTMLElement
  target.style.height = `${target.clientWidth}px`
  chartRef.value?.resize()
})

onBeforeUnmount(() => {
  observer.stop()
})
</script>

<style scoped lang="sass"></style>
