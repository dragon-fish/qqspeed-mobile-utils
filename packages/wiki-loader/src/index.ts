;(() => {
  const targets = document.querySelectorAll(['.speedm-container'].join(','))

  if (targets.length === 0) {
    return console.info('SpeedM loader:', 'No targets found.')
  }
})()
