<template lang="pug">
VChart.speedm-car-performance-radar(:option='option' autoresize)
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
        { name: '速度', max: 350 },
        { name: '集气', max: 130 },
        { name: '转向', max: 100 },
        { name: '动力', max: 250 },
        { name: '延续', max: 5 },
      ],
    },
    series: [
      {
        name: '',
        type: 'radar',
        tooltip: {
          formatter(payload) {
            console.info(payload)
            return JSON.stringify(payload)
          },
        },
        data: [
          {
            value: [
              driftPercent,
              car.wcwwwBoostSpeed,
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
</script>

<style scoped lang="sass"></style>
