import { QQSpeedM } from '@qqspeedm/core'
import { createApp, h, ref } from 'vue'
import 'uno.css'
import './styles/index.sass'
import PrimeVue from 'primevue/config'
import Garage from '@/components/Garage'

export class QQSpeedUI {
  static readonly components = {
    Garage,
  }
  readonly core = new QQSpeedM()

  private installPlugins(app: ReturnType<typeof createApp>) {
    app.use(PrimeVue, {})
  }

  renderGarage(el: HTMLElement, carInit: any) {
    if (!el) throw new Error('Missing element to render garage.')

    el.innerHTML = ''
    el.classList.add('qqspeed-container')

    const car = ref(this.core.createCar(carInit))
    const app = createApp({
      render: () => h(Garage, { car: car.value }),
    })
    this.installPlugins(app)
    app.mount(el)
    return app
  }
}
