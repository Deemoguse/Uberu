import anime from 'animejs'

class TooltipMap
{
  /*!*/ ref: NodeListOf<HTMLElement>
  /*!*/ elem: NodeListOf<HTMLElement>
  /*!*/ wrapper: HTMLElement

  constructor () {
    this.ref = document.querySelectorAll('.tooltipMap__wrapper')
    this.elem = document.querySelectorAll('.services__button')
    this.wrapper = document.querySelector('.tooltipMap')
  }

  public ANIME_NEW_MAP = () => anime({
    targets: '.tooltipMap__wrapper',
    scale: 1,
    translateX: '0%',
    duration: 1000,
    delay: 250,
    easing: 'easeInOutSine'
  })

  public ANIME_SHOW_TOOLTIP = () => anime({
    targets: '.tooltip__button',
    scale: [0.3,1],
    rotate: [0,90],
    opacity: [0,1],
    duration: 200,
    delay: anime.stagger(200, {start: 0}),
    easings: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'
  })

  public ANIME_HIDE_TOOLTIP = () => anime({
    targets: '.tooltip__button',
    scale: [1,0.3],
    rotate: [90,0],
    opacity: [1,0],
    duration: 200,
    delay: anime.stagger(200, {start: 0}),
    easings: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'
  })
}


class TooltipMapHandler extends TooltipMap
{
  /*!*/ lock: boolean = false
  /*!*/ activeMap: number = 0

  private handleClick = (elem: HTMLElement, id: number) => {
    elem.addEventListener('click', () => {
      if (this.activeMap !== id && this.lock === false) {
        this.activeMap = id
        this.newMap()
      }
    })
  }

  public newMap = (afterScroll = false) => {
    if (afterScroll === true) {
      const newMap = this.ref[0]
            newMap.classList.remove('template')

      this.wrapper.appendChild(newMap)
      return this.ANIME_NEW_MAP().finished.then(() => this.ANIME_SHOW_TOOLTIP())
    }

    const oldMap = document.querySelector('.tooltipMap__wrapper')
    const oldMapImg = document.querySelector('.tooltipMap__img').getAttribute('src')
    const newMap = this.ref[this.activeMap]
          newMap.classList.remove('template')
          newMap.style.transform = 'scale(2) translateX(100%)'

    this.lock = true
    this.wrapper.scrollTo({left: 0, behavior: 'smooth'})

    this.ANIME_HIDE_TOOLTIP().finished
      .then(() => this.wrapper.style.backgroundImage = `url(${oldMapImg})`)
      .then(() => oldMap.remove())
      .then(() => this.wrapper.appendChild(newMap))
      .then(() => this.ANIME_NEW_MAP().finished
      /*!*/ .then(() => {
      /*!*/   this.lock = false
      /*!*/   this.ANIME_SHOW_TOOLTIP()
      /*!*/ }))
  }

  public removeMaps = () => {
    document.querySelectorAll('.tooltipMap__wrapper').forEach((elem, id) => {
      id === 0 && elem.classList.add('template')
      id !== 0 && elem.remove()
    })

    this.wrapper.style.cssText = ''
    this.ANIME_HIDE_TOOLTIP()
  }

  public init = () => {
    this.removeMaps()
    this.wrapper.style.cssText = ''
    this.elem.forEach((elem, id) => this.handleClick(elem, id))
  }
}

function TooltipMapInit () {
  new TooltipMapHandler().init()
}

export default TooltipMapInit
export {TooltipMap, TooltipMapHandler}