<template lang="pug">
PDialog(
  :visible='show',
  @update:visible='emit("update:show", $event)',
  :header='`${car.name}：详细数据`',
  :style='{ width: "640px", maxWidth: "90%", maxHeight: "400px" }'
)
  h3 速度
  PDataTable(:value='speedStatistics')
    PColumn(field='label', header='类型', class='')
    PColumn(field='value', header='数值')
      template(#body='{ data }')
        strong {{ data.value }}
        |
        | km/h
  h3 动力
  PDataTable(:value='powerStatistics')
    PColumn(field='label', header='类型')
    PColumn(field='value', header='数值')
</template>

<script setup lang="ts">
import {} from 'vue'
import { QCar } from '@qqspeedm/core/lib/models'

const props = defineProps<{
  show: boolean
  car: QCar
}>()
const emit = defineEmits<{
  'update:show': [boolean]
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
</script>

<style scoped lang="sass"></style>
