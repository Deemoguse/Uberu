const ANIME_SHOW_TOOLTIP_BUTTON = () => {
  // Ищем новые экземпляры кнопок
  const buttons = document.querySelectorAll('.tooltip__item_button')

  // Анимация появления кнопок
  const animation = () => anime({
    targets: buttons,
    scale: 1,
    rotate: [anime.random(-20, 60), 0],
    opacity: [{value: 1, easing: 'linear'}],
    delay: anime.stagger(100, {start: 0}),
    easing: 'easeInOutElastic(1, 0.8)'
  })

  return animation()
}

const ANIME_NEW_TOOLTIP_MAP = (el: HTMLElement) => anime({
  targets: el,
  right: 0,
  duration: 1000,
  easing: 'easeInOutCubic',
})