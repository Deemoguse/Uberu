import anime from 'animejs'
import { TooltipMapHandler } from '../TooltipMap/TooltipMap.script'

class ServicesScroll {
  /*!*/ protected trigger: HTMLElement
  /*!*/ protected progress: {value: number}
  /*!*/ protected lock: boolean = false
  /*!*/ protected finished: boolean = false

  constructor () {
    this.trigger = document.querySelector('.questAnswer')
    this.progress = {value: 0}
  }

  public ANIME_SCROLL = (dir: 'down'|'top') => anime({
    targets: this.progress,
    value: dir === 'down'
      ? [this.progress.value, document.body.clientHeight - window.innerHeight]
      : [window.pageYOffset, this.trigger.offsetTop - 1],
    duration: 2000,
    easing: 'easeInOutSine',
    update: () => window.scrollTo({top: this.progress.value})
  })

  public init () {
    window.addEventListener('scroll', () => {
      const offsetY = window.pageYOffset
      const offsetClientTop = this.trigger.getBoundingClientRect().top

      if (offsetClientTop <= 0 && this.lock === false && this.finished === false) {
        this.progress.value = this.trigger.offsetTop
        this.ANIME_SCROLL('down').finished.then(() => (this.finished = true))
        this.lock = true
      }

      if (offsetY < this.progress.value && this.lock === true && this.finished === true) {
        this.ANIME_SCROLL('top').finished
          .then(() => (this.finished = false))
          .then(() => new TooltipMapHandler().removeMaps())

        this.lock = false
      }
    })
  }
}

class ServicesAside extends ServicesScroll
{
  /*!*/ elem: HTMLElement

  constructor() {
    /*!*/ super()
    this.elem = document.querySelector('.services__aside')
  }

  public ANIME_ASIDE = () => anime({
    targets: this.elem,
    left: 0,
    top: 0,
    duration: 2000,
    easing: 'easeInOutSine'
  })

  public init = () => {
    window.addEventListener('scroll', () => {
      console.log(this.lock);

      const offsetClientTop = this.trigger.getBoundingClientRect().top

      if (offsetClientTop <= 0 && this.lock === false) {
        this.lock = true
        this.elem.style.cssText = [
          'position: fixed',
          `top: ${window.innerWidth < 1024 ? -+this.elem.clientHeight : 0}px`,
          `left: ${window.innerWidth > 1024 ? -+this.elem.clientWidth : 0}px`,
          `width: ${this.elem.clientWidth}px`,
          `height: ${this.elem.clientHeight}px`,
          'z-index: 3'
        ].join(';')

        this.ANIME_ASIDE().finished.then(() => {
          this.elem.style.cssText = ''
          this.lock = true
        })
      }

      if (offsetClientTop >= 0 && this.lock === true) {
        this.lock = false
      }
    })
  }
}

function ServicesInit () {
  new ServicesScroll().init()
  new ServicesAside().init()
}

export default ServicesInit
export {ServicesScroll}