import anime from 'animejs'

/*state =====================*/
/*!*/ const state = {
/*!*/   lock: false,
/*!*/   hide: false
/*!*/ }

class FloatButton
{
  /*!*/ elem: HTMLElement
  /*!*/ wrapper: HTMLElement
  /*!*/ private trigger: HTMLElement
  /*!*/ private easing: string

  constructor () {
    this.elem = document.querySelector('.floatButton__button ')
    this.wrapper = document.querySelector('.floatButton')
    this.trigger = document.querySelector('.questAnswer')
    this.easing = 'spring(1, 90, 10, 0)'
  }

  public ANIME_REDUCTON = () => anime({
    targets: this.wrapper,
    bottom: -60,
    translateX: [{value: '-50%', duration: 0}],
    translateY: [{value: window.innerWidth < 1024 ? -20 : 0, duration: 0}],
    scale: 0.8,
    easing: this.easing,
  })

  public ANIME_ROTATE = () => anime({
    targets: this.elem,
    rotate: 40,
    left: 0,
    top: 0,
    easing: this.easing
  })

  public ANIME_INITIAL_SIZE = () => anime({
    targets: this.wrapper,
    bottom: 30,
    translateX: [{value: '-50%', duration: 0}],
    translateY: [{value: 0, duration: 0}],
    scale: 1,
    easing: this.easing,
  })

  public ANIME_INITIAL_ROTATE = () => anime({
    targets: this.elem,
    rotate: 0,
    left: 0,
    top: 0,
    easing: this.easing,
  })

  public ANIME_HIDDEN = () => anime({
    targets: this.wrapper,
    bottom: -200,
    easing: this.easing,
  })

  public init = () => window.addEventListener('scroll', () => {
    const offsetY = window.pageYOffset
    const triggetClientTop = this.trigger.getBoundingClientRect().top

    if (offsetY > 150 && state.lock === false) {
      this.wrapper.style.cssText = [
        'position: fixed',
        `bottom: ${window.innerHeight - this.wrapper.getBoundingClientRect().bottom}px`
      ].join(';')

      this.ANIME_ROTATE()
      this.ANIME_REDUCTON()
      state.lock = true
    }

    if (offsetY === 0 && state.lock === true) {
      this.ANIME_INITIAL_ROTATE()
      this.ANIME_INITIAL_SIZE().finished.then(() => {
        state.lock === false && (this.wrapper.style.position = 'absolute')
      })
      state.lock = false
    }

    if (triggetClientTop < 0 && state.hide === false) {
      this.ANIME_HIDDEN()
      state.hide = true
    }

    if (triggetClientTop > 0 && window.pageYOffset >= window.innerHeight * 1.25 && state.hide === true) {
      this.ANIME_REDUCTON()
      state.hide = false
    }
  })
}


class FloatButtonParallax extends FloatButton
{
  public ANIME_PARALLAX = (e: MouseEvent) => {
    const pos = (pos: number, side:'x'|'y') => pos
      - this.wrapper.getBoundingClientRect()[side === 'x' ? 'left' : 'top']
      - this.wrapper[side === 'x' ? 'clientWidth' : 'clientHeight'] / 2

    const range = 100
    const x = pos(e.clientX, 'x')
    const y = pos(e.clientY, 'y')

    anime({
      targets: this.elem,
      left: (x < -+range ? -+range : x > range ? range : x) * 0.4,
      top: (y < -+range ? -+range : y > range ? range : y) * 0.4,
      easing: 'cubicBezier(0.015, 0.45, 0.095, 0.75)',
    })
  }

  public FREEZE_ANIME_PARALLAX = () => {
    window.removeEventListener('mousemove', this.ANIME_PARALLAX)

    if (state.lock === true) {
      this.ANIME_REDUCTON()
      this.ANIME_ROTATE()
    } else {
      this.ANIME_INITIAL_ROTATE()
      this.ANIME_INITIAL_SIZE()
    }
  }

  public init = () => this.elem.addEventListener('mouseenter', () => {
    this.elem.addEventListener('mouseleave', this.FREEZE_ANIME_PARALLAX)
    window.addEventListener('mousemove', this.ANIME_PARALLAX)

    if (state.lock === true) {
      this.ANIME_INITIAL_ROTATE()
      this.ANIME_INITIAL_SIZE()
    }
  })
}

function FloatButtonInit () {
  new FloatButton().init()
  new FloatButtonParallax().init()
}

export { FloatButtonInit }