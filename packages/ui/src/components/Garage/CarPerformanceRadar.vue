<template lang="pug">
VChart.speedm-car-performance-radar(:option='option' ref='chartRef')
</template>

<script setup lang="ts">
import {} from 'vue'
import { QCar } from '@qqspeedm/core/lib/models'
import { type EChartsOption } from 'echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'

const props = defineProps<{
  car: QCar
}>()

use([CanvasRenderer, RadarChart, TooltipComponent, LegendComponent])

// provide(THEME_KEY, 'dark')

const toFixed2 = (num: number) => parseFloat(num.toFixed(2))

const option = computed<EChartsOption>(() => {
  const car = props.car

  const hasExtraWBoost =
    car.wBoostSpeedMultipliers && car.wBoostSpeedMultipliers[3]
  const maxSpeed = hasExtraWBoost ? car.wcwwwBoostSpeed : car.wcwwBoostSpeed

  // 以下效能耗时越短越好，基数为5秒
  const driftPercent = toFixed2((car.driftAroundSeconds * 100) / 5)
  const turnPercent = toFixed2((car.turnAroundSeconds * 100) / 5)
  const totalPersistence = toFixed2(car.cDurationSeconds + car.wDurationSeconds)

  return {
    legend: {},
    tooltip: {
      show: true,
      trigger: 'item',
    },
    backgroundColor: 'transparent',
    radar: {
      indicator: [
        { name: '漂移', max: 100 },
        { name: '速度', max: 350, min: 240 },
        { name: '集气', max: 130, min: 80 },
        { name: '转向', max: 100 },
        { name: '动力', max: 250 },
        { name: '延续', max: 6 },
      ],
    },
    series: [
      {
        name: '',
        type: 'radar',
        tooltip: {
          trigger: 'item',
          formatter(payload) {
            console.info(payload)
            return (
              `<pre>` +
              [
                `漂移一周：${car.driftAroundSeconds}s`,
                `
极限速度：
  CW   ${car.cwBoostSpeed}km/s
  WCW  ${car.wcwBoostSpeed}km/s
  CWW  ${car.cwwBoostSpeed}km/s
  WCWW ${car.wcwwBoostSpeed}km/s
  ${hasExtraWBoost ? `CWWW ${car.cwwwBoostSpeed}km/s` : ''}
  ${hasExtraWBoost ? `WCWWW ${car.wcwwwBoostSpeed}km/s` : ''}
`,
                `集气效率：${car.driftEnergyEfficiency}`,
                `转向一周：${car.turnAroundSeconds}s`,
                `叠喷动力：${car.combinedPower}`,
                `喷氮时间：${car.wDurationSeconds}s/${car.cDurationSeconds}s`,
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
              maxSpeed,
              car.driftEnergyEfficiency,
              turnPercent,
              car.combinedPower,
              totalPersistence,
            ],
            name: '',
          },
        ],
        areaStyle: {},
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
