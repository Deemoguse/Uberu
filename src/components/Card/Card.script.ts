import anime from 'animejs'

class Card {
  /*!*/ private elem: NodeListOf<HTMLElement>

  constructor () {
    this.elem = document.querySelectorAll('.card')
  }

  public ANIME_SHOW = () => anime({
    targets: this.elem,
    translateY: [80, 0],
    opacity: [0, 1],
    duration: 2000,
    delay: anime.stagger(150),
    easing: 'easeOutElastic(0.61, 1, 0.88, 1)',
  })

  public PLAY_ANIME_SHOW = () => {
    if (window.pageYOffset > 200) {
      window.removeEventListener('scroll', this.PLAY_ANIME_SHOW)
      this.ANIME_SHOW()
    }
  }

  public init () {
    window.addEventListener('scroll', this.PLAY_ANIME_SHOW)
  }
}

function CardInit () {
  new Card().init()
}

export { CardInit }