import { QCar, QCarAdaptability, QCarType } from '../models/Car.js'
import './styles.css'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeSanitize from 'rehype-sanitize'

const app = document.querySelector<HTMLDivElement>('#app')!
const remark = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeStringify)

function printCar(car: QCar) {
  const article = document.createElement('article')
  const text = `
## ${car.name}

Type: ${car.attr.type}

${car.attr.description || '(Missing description)'}

### Attributes

<details>

${'```'}json
${JSON.stringify(car.attr, null, 2)}
${'```'}

</details>

### Speeds
| Type | Speed |
|------|-------|
| Base:  | ${car.baseSpeed} |
| C:     | ${car.cBoostSpeed} |
| W:     | ${car.wBoostSpeed} |
| WC:    | ${car.wcBoostSpeed} |
| CW:    | ${car.cwBoostSpeed} |
| WCW:   | ${car.wcwBoostSpeed} |
| CWW:   | ${car.cwwBoostSpeed} |
| WCWW:  | ${car.wcwwBoostSpeed} |
| CWWW:  | ${car.cwwwBoostSpeed} |
| WCWWW: | ${car.wcwwwBoostSpeed} |

### Power

| Type     | Power |
|----------|-------|
| Base:     | ${car.basePower} |
| C:        | ${car.cBoostPower} |
| W:        | ${car.wBoostPower} |
| LeftBase: | ${car.leftBasePower} |
| Combined: | ${car.combinedPower} |
`.trim()

  const html = remark.processSync(text).toString()
  article.innerHTML = html

  app.appendChild(article)
}

const nbCar = new QCar({
  name: '新手赛车',
  description: '你的下一辆赛车，何必是赛车？',
})
printCar(nbCar)
// @ts-ignore
window.nbCar = nbCar

const tianXingZhe = new QCar({
  name: 'S-天行者',
  type: QCarType.A,
  description: '',
  baseSpeed: 202.5,
  cBoostSpeed: 313.9,
  wBoostSpeed: 243.1,
  cDurationSeconds: 3.11,
  wDurationSeconds: 0.69,
  basePower: 96.45,
  cBoostPower: 69.54,
  wBoostPower: 96.41,
  wBoostSpeedMultipliers: [0, 0, 0, 0],
  accelerationSeconds180: 3.242,
  turnAroundSeconds: 3.98,
  turnAroundSecondsWithStartUp: 4.08,
  driftAroundSeconds: 1.95,
  minSpeedWhileTurnAround: 193.5,
  adaptabilities: [QCarAdaptability.GRID],
  driftEnergyEfficiency: 121.78,
  skills: [
    {
      name: '',
      description:
        '氮气动力+18%。使用氮气即可达到CWW最高速度。每5次使用氮气，立即获得一个氮气。',
      icon: '',
    },
  ],
  boostSpouts: 5,
})
printCar(tianXingZhe)
