// Cостояние
let lockChange = false

// Смена карт
class TooltipMaps {
  /*!*/ private wrapper: HTMLElement
  /*!*/ private maps: Array<string> = []
  /*!*/ private buttons: NodeListOf<HTMLElement>

  // !!! Используются анимации которые лежат в файле anime_tooltipMap.ts

  constructor () {
    this.wrapper = document.querySelector('.tooltip')
    this.buttons = document.querySelectorAll('.services__button')
    document.querySelectorAll('.tooltip__mapWrapper').forEach(el => this.maps.push(el.outerHTML))

    this.remove_maps()
    this._init_buttons_listener()
  }

  // METHODS

  private _init_buttons_listener () {
    this.buttons.forEach((el: HTMLElement, id) => {
      el.addEventListener('click', () => this.set_map(id))
    })
  }

  public remove_maps () {
    document.querySelectorAll('.tooltip__mapWrapper').forEach(el => el.remove())
  }

  public set_map (id: number, createNode = true) {
    // Создание первой ноды
    if (createNode === false) {
      this.wrapper.innerHTML = this.maps[id] + this.wrapper.innerHTML
      return ANIME_SHOW_TOOLTIP_BUTTON()
    }

    // добавляем новую карту
    this.wrapper.innerHTML = this.wrapper.innerHTML + this.maps[id]

    // Объявляем старую и новую карты
    const oldMap: HTMLElement = this.wrapper.querySelector('.tooltip__mapWrapper:first-child')
    // Новой карте присваиваем абсолютную позицию и уводим за пределы коентейнера карты
    const newMap: HTMLElement = this.wrapper.querySelector('.tooltip__mapWrapper:last-child')
          newMap.style.cssText = 'position: absolute; right: 100%; top: 0'

    // Проигрываем анимацию замены карты
    ANIME_NEW_TOOLTIP_MAP(newMap).finished
    // Удаляем абсолютное позиционирование
    .then(() => (newMap.style.cssText = ''))
    // Удаляем старую карту
    .then(() => oldMap.remove())
    // Проигрываем анимацию появления кнопок тултипов
    .then(() => ANIME_SHOW_TOOLTIP_BUTTON())
  }
}

const tolltipsMaps = new TooltipMaps()