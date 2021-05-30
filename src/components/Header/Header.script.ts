import anime from 'animejs'

class HeaderBase
{
  /*!*/ private elem: HTMLElement
  /*!*/ private trigger: HTMLElement
  /*!*/ private fill: boolean = false
  /*!*/ private hide: boolean = false

  constructor () {
    this.elem = document.querySelector('.header')
    this.trigger = document.querySelector('.questAnswer')
  }

  public ANIME_FILL = () => anime({
    targets: this.elem,
    background: 'rgba(255,255,255, 1)',
    boxShadow: ['0px 2px 14px rgba(0, 0, 0, 0)', '0px 2px 14px rgba(0, 0, 0, 0.07)'],
    duration: 150,
    easing: 'linear'
  }).finished.then(() => (this.fill = true))

  public ANIME_UNFILLED = () => anime({
    targets: this.elem,
    background: 'rgba(255,255,255, 0)',
    boxShadow: ['0px 2px 14px rgba(0, 0, 0, 0.07)', '0px 2px 14px rgba(0, 0, 0, 0)'],
    duration: 150,
    easing: 'linear'
  }).finished.then(() => (this.fill = false))

  public ANIME_HIDDEN = () => anime({
    targets: this.elem,
    top: -+this.elem.clientHeight,
    duration: 350,
    easing: 'easeInOutSine'
  }).finished.then(() => (this.hide = true))

  public ANIME_SHOW = () => anime({
    targets: this.elem,
    top: 0,
    duration: 250,
    easing: 'linear'
  }).finished.then(() => (this.hide = false))

  public init = () => window.addEventListener('scroll', () => {
    const offsetY = window.pageYOffset
    const triggetClientTop = this.trigger.getBoundingClientRect().top

    if (offsetY > 150 && this.fill === false) this.ANIME_FILL()
    if (offsetY === 0 && this.fill === true) this.ANIME_UNFILLED()
    if (triggetClientTop < 0 && this.hide === false) this.ANIME_HIDDEN()
    if (triggetClientTop > 0 && this.hide === true) this.ANIME_SHOW()
  })
}


class HeaderMenu
{
  /*!*/ private triggerToOpen: HTMLElement
  /*!*/ private triggerToClose: HTMLElement
  /*!*/ private elem: HTMLElement
  /*!*/ private open: boolean = false

  constructor () {
    this.elem = document.querySelector('.header__menu')
    this.triggerToOpen = document.querySelector('.header__menuIcon')
    this.triggerToClose = document.querySelector('.header__crossIcon')
  }

  public ANIME_OPEN = () => anime({
    targets: this.elem,
    translateX: [105+'%', 0+'%'],
    duration: 550,
    easing: 'spring(1, 90, 10, 0)'
  })

  public ANIME_CLOSE = () => anime({
    targets: this.elem,
    translateX: [0+'%', 105+'%'],
    duration: 550,
    easing: 'spring(1, 90, 10, 0)'
  })

  public init = () => {
    this.triggerToOpen.addEventListener('click', () => {
      const windowWidth = window.innerWidth < 1440
      if (this.open === false && windowWidth) {
        this.ANIME_OPEN()
        this.open = true
      }
    })

    this.triggerToClose.addEventListener('click', () => {
      const windowWidth = window.innerWidth < 1440
      if (this.open === true && windowWidth) {
        this.ANIME_CLOSE()
        this.open = false
      }
    })

    window.addEventListener('click', (e: MouseEvent) => {
      const targetContain = this.elem.contains(e.target as HTMLElement) || this.triggerToOpen.contains(e.target as HTMLElement)
      const windowWidth = window.innerWidth < 1440

      if (windowWidth && targetContain === false && this.open === true) {
        this.ANIME_CLOSE()
        this.open = false
      }
    })

    window.addEventListener('resize', () => {
      const windowWidth = window.innerWidth > 1440
      if (windowWidth) this.elem.removeAttribute('style')
    })
  }
}

function HeaderInit () {
  new HeaderBase().init()
  new HeaderMenu().init()
}

export { HeaderInit }