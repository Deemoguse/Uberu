import anime from 'animejs'
import {TooltipMapHandler} from '../TooltipMap/TooltipMap.script'

interface I_ANIME_IMG_MOVE {
  top: number[]
  left: number[]
  right: number[]
  bottom: number[]
}

class QuestAnswer {
  /*!*/ ref: HTMLElement
  /*!*/ elem: HTMLElement
  /*!*/ trigger: HTMLElement
  /*!*/ lock: boolean = false

  constructor () {
    this.ref = document.querySelector('.services__aside')
    this.elem = document.querySelector('.questAnswer__img_wrapper')
    this.trigger = document.querySelector('.questAnswer')
  }

  public ANIME_IMG_MOVE = (pos: I_ANIME_IMG_MOVE) => anime({
    targets: this.elem,
    top: pos.top,
    left: pos.left,
    right: pos.right,
    bottom: pos.bottom,
    borderRadius: 0,
    duration: 2000,
    easing: 'easeInOutSine',
  })

  public init = () => window.addEventListener('scroll', () => {
    const triggetClientTop = this.trigger.getBoundingClientRect().top

    if (triggetClientTop <= 0 && this.lock === false) {
      const pos: I_ANIME_IMG_MOVE = {
        top: window.innerWidth < 1024
          ? [this.elem.getBoundingClientRect().top, this.ref.clientHeight]
          : [this.elem.getBoundingClientRect().top, 0],
        left: window.innerWidth < 1024
          ? [this.elem.getBoundingClientRect().left, 0]
          : [this.elem.getBoundingClientRect().left, this.ref.clientWidth],
        right: [window.innerWidth - this.elem.getBoundingClientRect().right, 0],
        bottom: [window.innerHeight - this.elem.getBoundingClientRect().bottom, 0],
      }

      this.lock = true
      this.elem.style.position = 'fixed'
      this.ANIME_IMG_MOVE(pos).finished
        .then(() => this.elem.removeAttribute('style'))
        .then(() => new TooltipMapHandler().newMap(true))
    }

    if (triggetClientTop >= 0 && this.lock === true) {
      this.lock = false
    }
  })
}

function QuestAnswerInit () {
  new QuestAnswer().init()
}

export default QuestAnswerInit
export {QuestAnswer}