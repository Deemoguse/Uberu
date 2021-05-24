const header = document.querySelector('.header')

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset

  if (scrollTop > 150) {
    header.classList.add('fill')
  }

  if (scrollTop < 150) {
    header.classList.remove('fill')
  }
})