const servicesShot: HTMLElement = document.querySelector('.services')
const servicesImg: HTMLElement =  document.querySelector('.questAnswer__img_wrapper')
const servicesAside: HTMLElement =  document.querySelector('.services__aside')
const servicesShotOffsetTop = servicesShot.offsetTop
const servicesEasing = 'easeInOutCubic'

// Состояния
let lockScrollToBottom = false
let finishSrollToBottom = false
let imgMoveToBottom = false
let startOffsetTop = {value: 0}

// Анимации
const ANIME_SCROLL_PAGE = (to: number) => anime({
  // Скролл страницы
  targets: startOffsetTop,
  value: to,
  duration: 1250,
  easing: servicesEasing,
  // На каждом обновлении скроллим страницу
  update: () => scrollTo({top: startOffsetTop.value + 50})
})

// Значения позиционирования изображения
let initialTopImg = null
let initialLeftImg = null
let initialWidthImg = null
let initialHeightImg = null

// Анимация смещения изображения
const ANIME_TOOLTIP_MAP_MOVE_IMG = () => {
  // Записываем исходные значения позиционирования изображения
  if (lockScrollToBottom === false) {
    initialTopImg = servicesImg.getBoundingClientRect().top
    initialLeftImg = servicesImg.getBoundingClientRect().left
    initialWidthImg = servicesImg.getBoundingClientRect().width
    initialHeightImg = servicesImg.getBoundingClientRect().height
  }

  // В начале анимации фиксируем элемент
  servicesImg.style.cssText = [
    'position: fixed',
    `top: ${initialTopImg}px`,
    `left: ${initialLeftImg}px`,
    `width: ${initialWidthImg}px`,
    `height: ${initialHeightImg}px`,
  ].join(';')

  // Анимация смещения изображения
  const animation = (
    dir: 'reverse'|boolean = false,
    duration: number = 1550
  ) => anime({
    targets: servicesImg,
    top: [initialTopImg, 0],
    left: [initialLeftImg, 370],
    width: [initialWidthImg, window.innerWidth - 370],
    height: [initialHeightImg, window.innerHeight],
    borderRadius: [8, 0],
    duration: duration,
    easing: 'easeInOutQuint',
    complete: () => {
      // Моментально возвращаем изображение в исходное положение и замыкаем функцию
      dir === 'reverse' && (servicesImg.style.cssText = 'position: relative; height: 100%')
      if (imgMoveToBottom === false) animation('reverse', 0).finished.then(() => (imgMoveToBottom = true))
    }
  })

  // // Возвращаем анимацию
  return animation()
}

// Анимация навбара
const ANIME_TOOLTIP_MAP_SHOW_NAV = () => anime({
  targets: servicesAside,
  left: [-370, 0],
  duration: 1250,
  easing: servicesEasing,
})

const ANIME_TOOLTIP_MAP_HIDDEN_NAV = () => anime({
  targets: servicesAside,
  top: document.body.clientHeight - servicesAside.clientHeight,
  duration: 1250,
  easing: servicesEasing,
})


// Событие автоматического скролла на последний шот
window.addEventListener('scroll', (e: MouseEvent) => {
  // При скролле обновляем позицию с которой будет начинаться анимация
  startOffsetTop.value = window.pageYOffset

  // !!! Анимации шапки лежат в файле ./header.anime.ts; 19 и 26 строки

  if (window.pageYOffset >= 1450 && lockScrollToBottom === false && finishSrollToBottom === false) {
    // Смещаем изображение
    ANIME_TOOLTIP_MAP_MOVE_IMG()
    // Запускаем анимацию появления навбара
    ANIME_TOOLTIP_MAP_SHOW_NAV()
    // Прячем шапку
    ANIME_HIDDEN_HEADER()
    // Скроллим вниз
    ANIME_SCROLL_PAGE(servicesShotOffsetTop).finished.
    // Отчитываемся об окончании анимации
    then(() => (finishSrollToBottom = true))
    // Блокируем повторную анимацию скролла
    lockScrollToBottom = true
  }

  if (lockScrollToBottom === true && finishSrollToBottom === true) {
    // Показываем шапку
    ANIME_SHOW_HEADER()
    // фиксируем навбар
    ANIME_TOOLTIP_MAP_HIDDEN_NAV()
    // Скроллим вверх
    ANIME_SCROLL_PAGE(1350).finished
    // Отчитываемся об окончании анимации
    .then(() => (finishSrollToBottom = false))
    // Прячем навбар
    .then(() => servicesAside.style.cssText = 'position: fixed; top: 0; left: -370px')
    // Разрешаем повторную анимацию
    lockScrollToBottom = false
    // Размыкаем функцию смещения изображения
    imgMoveToBottom = false
  }
})