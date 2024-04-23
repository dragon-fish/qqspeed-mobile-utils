import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { QCar, QCarBase } from '@qqspeedm/core/lib/models/Car.js'
import { useDirname } from './utils/dir.js'

const __dirname = useDirname(import.meta.url)

// Main
;(async () => {
  const raw = await readFile(
    resolve(__dirname, './input/赛车数据.json'),
    'utf-8'
  )
  const rawJson = JSON.parse(raw)
  const allCars = Object.values(rawJson).map((item: any) => {
    const name = (item.名称 || '').split(' ')[0]
    const car = new QCar({
      name,
      primaryView: `https://wiki.biligame.com/qqspeed/Special:Filepath/${name}.png`,
      baseSpeed: item.数据.平跑最高速度,
      wBoostSpeed: item.数据.小喷最高速度,
      cBoostSpeed: item.数据.氮气最高速度,
      minSpeedWhileTurnAround: item.数据.转向最低速,
      wBoostPower: getMinValueFromMultiData(item.数据.小喷动力),
      cBoostPower: getMinValueFromMultiData(item.数据.氮气动力),
      basePower: (getMinValueFromMultiData(item.数据.基础动力) * 100 * 5) / 100,
      accelerationSeconds180: getMinValueFromMultiData(item.数据['0-180/s']),
      wDurationSeconds: item.数据['小喷时长/s'],
      cDurationSeconds: item.数据['氮气时长/s'],
      turnAroundSeconds: getMinValueFromMultiData(item.数据.转向一周耗时),
      turnAroundSecondsWithStartUp:
        (getMinValueFromMultiData(item.数据.转向一周耗时) * 100 + 100) / 100,
      driftAroundSeconds: getMinValueFromMultiData(item.数据.漂移一周耗时),
      driftEnergyEfficiency: item.数据.集气系数 || 80,
    })

    const [perk, superECU] = ((item.特性 as string) || '')
      .split(/超级ECU：?/i)
      ?.map((i) => i.trim())
    if (perk) {
      car.perks.push({
        name: '',
        description: perk,
        bounses: [],
      })
    }
    if (superECU) {
      ;(car.superECU ??= []).push({
        name: '',
        description: superECU,
        bounses: [],
      })
    }
    if (perk && /wcw喷可达到?cww喷极限/i.test(perk)) {
      car.wBoostSpeedMultipliers = [0.15, 0.65, 0.15, 0]
    }
    if (car.name === 'S-天行者') {
      car.wBoostSpeedMultipliers = Array(4).fill(0)
    }

    if (
      [
        '源极之星EXA',
        '序列未来LYR',
        '孙悟空',
        '奥莉娜',
        '哈雷特',
        '墨影青龙',
      ].includes(car.name)
    ) {
      car.class = 'T' as any
    } else if (car.name === '新手赛车') {
      car.class = 'D' as any
    } else {
      car.class = 'A' as any
    }

    return car.toJSON() as QCarBase
  })

  const total = allCars.length
  let done = 0
  allCars.forEach(async (data) => {
    const file = resolve(__dirname, `./output/${data.name}.json`)
    await writeFile(file, JSON.stringify(data, null, 2), 'utf-8')
    done++
    console.info(
      `[${('' + done).padStart(('' + total).length, '0')}/${total}] ${file}`
    )
  })

  await writeFile(
    resolve(__dirname, './output/@all.json'),
    JSON.stringify(allCars, null, 2)
  )

  const carIndex = allCars.map((car) => car.name)
  await writeFile(
    resolve(__dirname, './output/@index.json'),
    JSON.stringify(carIndex, null, 2),
    'utf-8'
  )
})()

function resolveMultiData(data?: any): number[] {
  if (!data) return [0]
  if (typeof data === 'number') return [data]
  if (typeof data === 'string') {
    return data
      .split('/')
      .map((i) => i.replace('s', ''))
      .map(Number)
  }
  return [0]
}

function getMinValue(data: number[]): number {
  return data.reduce((min, cur) => (cur < min ? cur : min), Infinity)
}

function getMinValueFromMultiData(data: any): number {
  return getMinValue(resolveMultiData(data))
}
