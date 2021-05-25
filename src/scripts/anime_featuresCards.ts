function animeCard () {
  // Анимация появления карт
  anime({
    targets: '.features__item',
    translateY: [80, 0],
    opacity: [0, 1],
    duration: 2000,
    delay: anime.stagger(150),
    easing: 'easeOutElastic(0.61, 1, 0.88, 1)',
  })
}

function useAnimeCard () {
  if (window.pageYOffset > 200) {
    animeCard()

    // удаление слушателя для предотвращения утечки и повторной анимации
    window.removeEventListener('scroll', useAnimeCard)
  }
}

// инициализация слушателя
window.addEventListener('scroll', useAnimeCard)