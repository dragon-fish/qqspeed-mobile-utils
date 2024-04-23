import 'dotenv/config'
import { MwApi } from 'wiki-saikou'
import { readdir, readFile } from 'fs/promises'
import { resolve } from 'node:path'
import { useDirname } from './utils/dir'
import sleep from './utils/sleep'

const __dirname = useDirname(import.meta.url)

const api = new MwApi('https://wiki.biligame.com/qqspeed/api.php')

api.cookies = {
  DedeUserID__ckMd5: process.env['DedeUserID__ckMd5'] as any,
  SESSDATA: process.env['SESSDATA'] as any,
}

const userInfo = await api.getUserInfo()
if (userInfo.id < 1) {
  throw new Error('登录失败，可能是 cookie 不正确')
}

const fileList = (await readdir(resolve(__dirname, './output'))).filter(
  (file) => file.endsWith('.json')
)

const total = fileList.length
let done = 0
for (const fileName of fileList) {
  const title = `Module:QCar/data/${fileName}`
  const text = await readFile(resolve(__dirname, './output', fileName), 'utf-8')
  const summary = `[自动程序] 批量更新赛车数据`
  const { data } = await api.postWithToken('csrf', {
    action: 'edit',
    title,
    text,
    summary,
    contentmodel: 'json',
  })
  if (data?.edit?.result !== 'Success') {
    throw new Error(`更新失败：`, data)
  }
  done++
  console.info(
    `[${('' + done).padStart(('' + total).length, '0')}/${total}] ${title}`
  )
  await sleep(1000)
}
