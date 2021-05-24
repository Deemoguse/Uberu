const header = document.querySelector('.header')

const hiddenHeader = () => anime({
  targets: header,
  top: -+header.clientHeight,
  easing: 'cubicBezier(0.015, 0.45, 0.095, 0.75)'
})

const showHeader = () => anime({
  targets: header,
  top: 0,
  easing: 'cubicBezier(0.015, 0.45, 0.095, 0.75)'
})

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset

  // Заливка шапки при скролле
  scrollTop > 150 && header.classList.add('fill')
  scrollTop < 150 && header.classList.remove('fill')

  // Скрываем шапки при скролле на последний шот
  scrollTop >= 2400 && hiddenHeader()
})