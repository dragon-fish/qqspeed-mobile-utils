import { QQSpeedM } from '@qqspeedm/core'
import Garage from '@/components/Garage'
import { DefineComponent } from 'vue'
import JSON5 from 'json5'

interface BindComponentDefinition {
  id: string
  alias: string[]
  Component: DefineComponent
  Model: any
  bindProp: string
}

export class QQSpeedUI {
  readonly core = new QQSpeedM()
  readonly COMPONENT_SETS: BindComponentDefinition[] = [
    {
      id: 'garage',
      alias: ['garage', '车库', '赛车', 'car'],
      Component: Garage,
      bindProp: 'car',
      Model: this.core.models.QCar,
    },
  ]

  constructor() {}

  getComponentFromJSONText(el: HTMLElement) {
    const compName = (el.dataset.component || '').trim().toLowerCase()
    const compDef = this.COMPONENT_SETS.find(
      (c) => c.id === compName || c.alias.includes(compName)
    )
    if (!compDef) {
      throw new Error(`Component "${compName}" not found`)
    }
    const { Component, bindProp, Model } = compDef

    const props = JSON5.parse(el.innerText || '{}')
    const instance = new Model(props)

    const component = h(Component, {
      [bindProp]: instance,
    })

    return component
  }

  getComponentFromWikiJSON(el: HTMLElement) {}
}
