export function fixedBody () {
  let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  document.body.style.cssText += 'position:fixed;width:100%;top:-' + scrollTop + 'px;'
}

export function looseBody() {
  let body = document.body
  body.style.position = ''
  let top = body.style.top
  document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top)
  body.style.top = ''
}
