const servicesShot: HTMLElement = document.querySelector('.services')
const servicesImg: HTMLElement = document.querySelector('.questAnswer__img_wrapper')
const servicesAside: HTMLElement = document.querySelector('.services__aside')
const servicesAsideWidth = document.querySelector('.tooltip__mapWrapper').getBoundingClientRect().left
let servicesShotOffsetTop = servicesShot.offsetTop
const servicesEasing = 'easeInOutCubic'

// Устанавливаем слушатель для обновления значения ширины навбара
window.addEventListener('resize', () => (servicesShotOffsetTop))

// Устанавливаем дефолтные значения для позиционирования навбара
const setDefPosAside = () => servicesAside.style.cssText = [
  'position: fixed',
  `left: -${servicesAsideWidth}px`,
  'top: 0',
  'bottom: 0',
  `width: ${servicesAsideWidth}px`,
].join(';')

setDefPosAside()

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
let initialRightImg = null
let initialBottomImg = null

// Анимация смещения изображения
const ANIME_TOOLTIP_MAP_MOVE_IMG = () => {
  // Записываем исходные значения позиционирования изображения
  if (lockScrollToBottom === false) {
    initialTopImg = servicesImg.getBoundingClientRect().top
    initialLeftImg = servicesImg.getBoundingClientRect().left
    initialRightImg = window.innerWidth - servicesImg.getBoundingClientRect().right
    initialBottomImg = window.innerHeight - servicesImg.getBoundingClientRect().bottom
  }

  // В начале анимации фиксируем изображение
  servicesImg.style.cssText = [
    'position: fixed',
    `top: ${initialTopImg}px`,
    `left: ${initialLeftImg}px`,
    `right: ${initialRightImg}px`,
    `bottom: ${initialBottomImg}px`,
  ].join(';')

  // Анимация смещения изображения
  const animation = (
    dir: 'reverse'|boolean = false,
    duration: number = 1250,
    delay: number = 0
  ) => anime({
    targets: servicesImg,
    top: [initialTopImg, 0],
    left: [initialLeftImg, servicesAsideWidth],
    right: [initialRightImg, 0],
    bottom: [initialBottomImg, 0],
    borderRadius: [8, 0],
    duration: duration,
    delay: delay,
    easing: 'easeInOutQuint',
    complete: () => {
      // Моментально возвращаем изображение в исходное положение и замыкаем функцию
      dir === 'reverse' && (servicesImg.style.cssText = 'position: relative; height: 100%')
      if (imgMoveToBottom === false) animation('reverse', 0, 100).finished.then(() => (imgMoveToBottom = true))
    }
  })

  // // Возвращаем анимацию
  return animation()
}

// Показ навбара
const ANIME_SHOW_ASIDE = () => anime({
  targets: servicesAside,
  left: 1,
  duration: 1250,
  easing: servicesEasing,
}).finished.then(() =>servicesAside.style.cssText = '')

// Событие автоматического скролла на последний шот
window.addEventListener('scroll', (e: MouseEvent) => {
  // При скролле обновляем позицию с которой будет начинаться анимация
  startOffsetTop.value = window.pageYOffset

  // !!! Анимации шапки лежат в файле ./anime_header.ts; 19 и 26 строки
  // !!! Методы создание карты лежат в файле ./tooltipMap.ts

  if (window.pageYOffset >= 1450 && lockScrollToBottom === false && finishSrollToBottom === false) {
    // Смещаем изображение
    ANIME_TOOLTIP_MAP_MOVE_IMG()
    // Прячем шапку
    ANIME_HIDDEN_HEADER()
    // Показываем навбар
    ANIME_SHOW_ASIDE()
    // Скроллим вниз
    ANIME_SCROLL_PAGE(servicesShotOffsetTop).finished
    // Отчитываемся об завершении анимации
    .then(() => (finishSrollToBottom = true))
    // Показываем первую карту тултипов
    .then(() => tolltipsMaps.set_map(0, false))
    // Блокируем повторную анимацию скролла
    lockScrollToBottom = true
  }

  if (lockScrollToBottom === true && finishSrollToBottom === true) {
    // Показываем шапку
    ANIME_SHOW_HEADER()
    // Скроллим вверх
    ANIME_SCROLL_PAGE(1350).finished
    // Отчитываемся об окончании анимации
    .then(() => (finishSrollToBottom = false))
    // Прячем навбар
    .then(() => setDefPosAside())
    // Удаляем карту тултипов
    .then(() => tolltipsMaps.remove_maps())
    // Разрешаем повторную анимацию
    lockScrollToBottom = false
    // Размыкаем функцию смещения изображения
    imgMoveToBottom = false
  }
})