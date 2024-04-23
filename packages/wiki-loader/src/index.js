let __loaded = false
mw.hook('wikipage.content').add(($content) => {
  if (__loaded) {
    return
  }
  __loaded = true

  if ($content.find('.speedm-component').length < 1) {
    return console.info('No speedm-component found in the content')
  }

  import('https://unpkg.com/@qqspeedm/ui?module').then((module) => {})
})

/**
 *
 * @param {import('@qqspeedm/core').QQSpeedM} QQSpeedM
 * @param {*} $content
 */
async function main(QQSpeedM, $content) {
  // Do something with SpeedM and $content
}
