<template lang="pug">
//- 赛车标题
h2.car-name-title(m='b-2 x--6', flex='~', items='center', skew='x-[-15deg]')
  .car-title__class(
    :class='[`class-${car.class}`]',
    text='8 italic',
    bg='#4876fe',
    p='x-4 y-2'
  ) {{ car.class }}
  .car-title__name(text='italic 6', font='700', m='l-4') {{ car.name }}
</template>

<script setup lang="ts">
import {} from 'vue'
import { QCar } from '@qqspeedm/core/lib/models'

defineProps<{
  car: QCar
}>()
</script>

<style scoped lang="sass">
.car-name-title
  background-image: repeating-linear-gradient(-90deg, #1e295ecc, #1e295ecc 2px, #69e8ff22 2px, #69e8ff22 4px)
  .car-title__class
    padding-right: 2rem
    background-image: linear-gradient(to left, #69e8ff, #69e8ff 2px, #1e295ecc 2px, #1e295ecc 8px, #69e8ff 8px, #69e8ff 12px, #1e295ecc 12px, #1e295ecc 16px, #69e8ff 16px, #4876fe)
    font-weight: 900
    text-shadow: 1px 1px 1px #333
    &.class-D
      color: #e2e7ec
    &.class-A
      color: #e44dff
    &.class-T
      color: #fdd848
</style>
