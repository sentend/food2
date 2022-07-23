import { getData } from '../services/services'

export default function menuCard() {
	//*карточки с меню при использовании классов и работа с сервером db.json

	class MenuCard {
		constructor(menuTitle, img, alt, description, price, transfer, parentSelector, ...classes) {
			this.menuTitle = menuTitle
			this.img = img
			this.alt = alt
			this.description = description
			this.price = price
			this.classes = classes
			this.transfer = transfer
			this.parent = document.querySelector(parentSelector)
		}

		changeCurrency() {
			this.price = this.price * this.transfer
		}

		render() {
			this.changeCurrency()
			const element = document.createElement('div')

			if (this.classes.length === 0) {
				this.class = 'menu__item'
				element.classList.add(this.class)
			} else {
				this.classes.forEach((className) => {
					element.classList.add(className)
				})
			}

			element.innerHTML += `
				<img src=${this.img} alt=${this.alt} />
				<h3 class="menu__item-subtitle">${this.menuTitle}</h3>
				<div class="menu__item-descr">
					${this.description}
				</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> руб/день</div>
				</div>`
			this.parent.append(element)
		}
	}

	getData('http://localhost:3000/menu').then((data) => {
		data.forEach(({ img, title, altimg, descr, price, transfer }) => {
			new MenuCard(title, img, altimg, descr, price, transfer, '.menu__field .container', 'menu__item', 'big').render()
		})
	})
}
