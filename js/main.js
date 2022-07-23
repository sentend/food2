import calc from '/js/modules/calc'
import menuCard from '/js/modules/menuCard'
import modal from '/js/modules/modal'
import forms from '/js/modules/forms'
import slider from '/js/modules/slider'
import tabs from '/js/modules/tabs'
import timer from '/js/modules/timer'
import { toggleModalWindow } from '/js/modules/modal'

let timeout = setTimeout(() => {
	toggleModalWindow('show', '.modal', timeout)
}, 3000)

calc()
menuCard()
modal('[data-modal]', '.modal', timeout)
forms('form', timeout)
slider({ slide: '.offer__slide' })
tabs('.tabcontent', '.tabheader__item', '.tabheader__items', 'tabheader__item_active')
timer('.timer', '2022-07-31')
