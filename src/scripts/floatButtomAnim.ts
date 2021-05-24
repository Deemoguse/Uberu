const floatButtonWrapper: HTMLElement = document.querySelector('.floatButton ')
const floatButton: HTMLElement = document.querySelector('.floatButton__button')
const floatButtonEasing = 'spring(1, 90, 10, 0)'

// анимации кнопки
const ANIME_BUTTOM_REDUCTON = () => anime({
  // Анимация падения кнопки к нижнему краю окна
  targets: floatButtonWrapper,
  bottom: -60,
  translateX: [{value: '-50%', duration: 0}],
  scale: 0.8,
  easing: floatButtonEasing,
})

const ANIME_BUTTON_ROTATE = () => anime({
  // Анимация повора кнопки
  targets: floatButton,
  rotate: 40,
  left: 0,
  top: 0,
  easing: floatButtonEasing
})

const ANIME_BUTTON_HIDDEN = () => anime({
  // Изчезновения кнопки
  targets: floatButtonWrapper,
  bottom: -200,
  easing: floatButtonEasing,
})

// Анимации сброса (возвращение в исходное состояние)
const ANIME_BUTTON_INITIAL_SIZE = () => anime({
  // Поднятие кнопки в исходное положение
  targets: floatButtonWrapper,
  bottom: 30,
  translateX: [{value: '-50%', duration: 0}],
  scale: 1,
  easing: floatButtonEasing,
})

const ANIME_BUTTOM_INITIAL_ROTATE = () => anime({
  // Обратный поворот кнопки
  targets: floatButton,
  rotate: 0,
  left: 0,
  top: 0,
  easing: floatButtonEasing,
})

// Инизиализация
let lockAnime = false
// Анимация при скролле
function scrollAnimefloatButton () {
  // Скрытие кнопки после скролла q&a
  if (window.pageYOffset >= 1290) {
    return ANIME_BUTTON_HIDDEN()
  }
  // Показывает кнопку при скролле наверх
  if (window.pageYOffset <= 1290 && window.pageYOffset >= window.innerHeight * 1.25) {
    ANIME_BUTTOM_REDUCTON()
  }

  if (window.pageYOffset > 150 && lockAnime === false) {
    // Определяем высоту контейнера от нижнего края окна в момент удовлетворения условия
    const wrapperPosBottom = window.innerHeight - floatButtonWrapper.getBoundingClientRect().bottom

    // Устанавливаем контейнеру кнопки позицию 'fixed' и устанавливаем положение по оси Y
    floatButtonWrapper.style.position = 'fixed'
    floatButtonWrapper.style.bottom = wrapperPosBottom + 'px'

    // Воспроизводим анимации
    ANIME_BUTTOM_REDUCTON()
    ANIME_BUTTON_ROTATE()

    // Запрещаем повторное воспроизведение анимации и завершаем функцию
    return (lockAnime = true)
  }

  // если мы в самом начале страницы то откатывает состояние
  if (window.pageYOffset === 0 && lockAnime === true) {
    // Воспроизводим анимации
    ANIME_BUTTON_INITIAL_SIZE()
    // После завершения анимации возвращаем исходные свойства
    ANIME_BUTTOM_INITIAL_ROTATE().finished.then(() => {
      floatButtonWrapper.style.position = 'absolute'
      floatButtonWrapper.style.top = 'auto'
    })

    // Разрешаем повторное воспроизведение анимации и завершаем функцию
    return (lockAnime = false)
  }
}

// Анимация при наведении
function hoverAnimefloatButton (e: MouseEvent) {
  // Функция определения положения мыши
  const mousePos = (pos: number, side:'x'|'y') => pos
    - floatButtonWrapper.getBoundingClientRect()[side === 'x' ? 'left' : 'top']
    - floatButtonWrapper[side === 'x' ? 'clientWidth' : 'clientHeight'] / 2

  // Функция параллакса
  const parallax = (e: MouseEvent) => {
    const range = 100
    const x = mousePos(e.clientX, 'x')
    const y = mousePos(e.clientY, 'y')

    // Параллакс кнопки
    anime({
      targets: floatButton,
      left: (x < -+range ? -+range : x > range ? range : x) * 0.4,
      top: (y < -+range ? -+range : y > range ? range : y) * 0.4,
      easing: 'cubicBezier(0.015, 0.45, 0.095, 0.75)',
    })

    // floatButton.style.left = (x < -+range ? -+range : x > range ? range : x) * 0.4 + 'px'
    // floatButton.style.top = (y < -+range ? -+range : y > range ? range : y) * 0.4 + 'px'
  }

  // Инициализация параллакса
  window.addEventListener('mousemove', parallax)

  // Если кнопка уже провалилась к нижней части окна, то откатываем состояние и поднимает вверх
  if (lockAnime) {
    ANIME_BUTTON_INITIAL_SIZE()
    ANIME_BUTTOM_INITIAL_ROTATE()
  }

  // Удаляем слушатель и обнуляем анимацию
  floatButton.addEventListener('mouseleave', function () {
    window.removeEventListener('mousemove', parallax)

    // Если кнопка уже провалилась к нижней части окна, то откатываем состояние и поднимает вверх
    if (lockAnime) {
      ANIME_BUTTOM_REDUCTON()
      ANIME_BUTTON_ROTATE()
    } else {
      // Иначе обнуляем позиционирование кнопки
      ANIME_BUTTOM_INITIAL_ROTATE()
    }
  })
}

// Инициализация главных слушателей слушателей
window.addEventListener('scroll', scrollAnimefloatButton)
floatButton.addEventListener('mouseenter', hoverAnimefloatButton)