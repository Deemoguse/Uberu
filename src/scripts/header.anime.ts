const header = document.querySelector('.header')

const ANIME_FILL_HEADER = () => anime({
  targets: header,
  background: 'rgba(255,255,255, 1)',
  boxShadow: ['0px 2px 14px rgba(0, 0, 0, 0)', '0px 2px 14px rgba(0, 0, 0, 0.07)'],
  duration: 250,
  easing: 'linear'
}).finished.then(() => (fillHeader = true))

const ANIME_UNFILLED_HEADER = () => anime({
  targets: header,
  background: 'rgba(255,255,255, 0)',
  boxShadow: ['0px 2px 14px rgba(0, 0, 0, 0.07)', '0px 2px 14px rgba(0, 0, 0, 0)'],
  duration: 250,
  easing: 'linear'
}).finished.then(() => (fillHeader = false))

const ANIME_HIDDEN_HEADER = () => anime({
  targets: header,
  top: -+header.clientHeight,
  duration: 350,
  easing: 'easeInOutSine'
}).finished.then(() => (hiddenHeader = true))

const ANIME_SHOW_HEADER = () => anime({
  targets: header,
  top: 0,
  duration: 250,
  easing: 'linear'
}).finished.then(() => (hiddenHeader = false))

// Состояния
let hiddenHeader = false
let fillHeader = false

// Инициализация главного слушателя
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset

  // Заливка шапки при скролле
  if (scrollTop > 150 && fillHeader === false) ANIME_FILL_HEADER()
  if (scrollTop < 150 && fillHeader === true) ANIME_UNFILLED_HEADER()

  // Скрываем шапки при скролле на последний шот
  // if (scrollTop > 2400 && hiddenHeader === false) ANIME_HIDDEN_HEADER()
  // Показываем шапку при скроле вверх
  // if (scrollTop < 2400 && hiddenHeader === true) ANIME_SHOW_HEADER()

  // ======================================================================================
  // !!! Функции скрытия\показа используются в файле ./questAnswer.anime.ts; 30 и 41 строки
  // ======================================================================================
})