mw.hook('wikipage.content').add(($content) => {
  const LIB_VERSION = 'latest'

  ;(async () => {
    // @ts-ignore
    const contentEl: HTMLElement = $content.get(0)

    const targets = Array.from(
      contentEl.querySelectorAll<HTMLElement>(
        ['.speedm-container', '.speedm-component'].join(',')
      )
    )

    if (targets.length === 0) {
      return console.info('SpeedM loader:', 'No targets found.')
    }

    const [{ default: JSON5 }, { QQSpeedUI }] = await Promise.all([
      import('https://unpkg.com/json5@2.2.3/dist/index.mjs?module'),
      import(
        `https://unpkg.com/@qqspeedm/ui@${LIB_VERSION}/dist/index.es.js?module`
      ),
    ])
    mw.loader.load(
      `https://unpkg.com/@qqspeedm/ui@${LIB_VERSION}/dist/style.css`,
      'text/css'
    )

    console.info('SpeedM loader:', 'Dependencies loaded.')
    main(targets, { JSON5, QQSpeedUI })
  })()

  async function main(targets: HTMLElement[], modules: any) {
    const { JSON5, QQSpeedUI } = modules
    const ui = new QQSpeedUI()
    console.info('SpeedM loader:', 'main', targets, modules)

    targets.forEach((el) => {
      el.classList.add('speedm-container')

      if (el.dataset.component === 'garage') {
        handleGarage(el, ui)
      }
    })

    async function handleGarage(el: HTMLElement, ui: any) {
      console.info('SpeedM loader:', 'handleGarage', el)
      let carInit = null
      if (typeof el.dataset.rawJson !== 'undefined') {
        carInit = JSON5.parse(el.innerText)
      } else if (el.dataset.carName) {
        carInit = await fetch(
          mw.util.getUrl(`Module:QCar/data/${el.dataset.carName}.json`, {
            action: 'raw',
            ctype: 'application/json',
          })
        )
      }
      console.info('SpeedM loader:', 'handleGarage', carInit)
      el.innerHTML = ''
      return ui.renderGarage(el, carInit || {})
    }
  }
})
