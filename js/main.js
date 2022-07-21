//*работа с табами меню

const tabsContent = document.querySelectorAll('.tabcontent')
const tabs = document.querySelectorAll('.tabheader__item')
const tabsParent = document.querySelector('.tabheader__items')

const hideTabContent = () => {
	tabsContent.forEach((item) => {
		item.classList.add('hide')
		item.classList.remove('show', 'fade')
	})

	tabs.forEach((item) => {
		item.classList.remove('tabheader__item_active')
	})
}

const showTabContent = (i = 1) => {
	tabsContent[i].classList.remove('hide')
	tabsContent[i].classList.add('show', 'fade')
	tabs[i].classList.add('tabheader__item_active')
}

hideTabContent()
showTabContent()

tabsParent.addEventListener('click', (e) => {
	let target = e.target
	if (target && target.classList.contains('tabheader__item')) {
		tabs.forEach((item, i) => {
			if (target == item) {
				hideTabContent()
				showTabContent(i)
			}
		})
	}
})

//*таймер

const deadline = '2022-07-17'

function getTimeRemaining(endtime) {
	const time = Date.parse(endtime) - Date.now()
	const days = Math.floor(time / (24 * 60 * 60 * 1000))
	const hours = Math.floor((time / (60 * 60 * 1000)) % 24)
	const minutes = Math.floor((time / (60 * 1000)) % 60)
	const seconds = Math.floor((time / 1000) % 60)

	return {
		total: time,
		days: days > 0 ? days : 0,
		hours: hours > 0 ? hours : 0,
		minutes: minutes > 0 ? minutes : 0,
		seconds: seconds > 0 ? seconds : 0,
	}
}

function setClock(selector, endtime) {
	const timer = document.querySelector(selector)
	const timerDays = document.querySelector('#days')
	const timerHours = document.querySelector('#hours')
	const timerMinutes = document.querySelector('#minutes')
	const timerSeconds = document.querySelector('#seconds')
	const timerInterval = setInterval(updateClock, 1000)

	updateClock()

	function updateClock() {
		const t = getTimeRemaining(endtime)
		timerDays.innerHTML = t.days >= 10 ? t.days : `0${t.days}`
		timerHours.innerHTML = t.hours >= 10 ? t.hours : `0${t.hours}`
		timerMinutes.innerHTML = t.minutes >= 10 ? t.minutes : `0${t.minutes}`
		timerSeconds.innerHTML = t.seconds >= 10 ? t.seconds : `0${t.seconds}`

		if (t.total <= 0) {
			clearInterval(timerInterval)
		}
	}
}

setClock('.timer', deadline)

//*модальное окно

const openModal = document.querySelectorAll('[data-modal]')
const modalWindow = document.querySelector('.modal')
let timeout

function toggleModalWindow(toggle) {
	if (toggle == 'show') {
		modalWindow.classList.remove('hide')
		modalWindow.classList.add('show')
		document.body.style.overflow = 'hidden'
		clearInterval(timeout)
	} else {
		modalWindow.classList.remove('show')
		modalWindow.classList.add('hide')
		document.body.style.overflow = ''
	}
}

function showModalByScroll() {
	if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
		toggleModalWindow('show')
		window.removeEventListener('scroll', showModalByScroll)
	}
}

window.addEventListener('scroll', showModalByScroll)

openModal.forEach((item) => {
	item.addEventListener('click', () => toggleModalWindow('show'))
})

timeout = setTimeout(() => {
	toggleModalWindow('show')
}, 300000)

modalWindow.addEventListener('click', (e) => {
	if (e.target === modalWindow || e.target.classList.contains('modal__close')) {
		toggleModalWindow('close')
	}
})

document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && modalWindow.classList.contains('show')) {
		toggleModalWindow('close')
	}
})

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
	//TODO:понять как можно дождаться расчёта прайса до рендера
	changeCurrency() {
		// this.transfer = await fetch('http://localhost:3000/transfer')
		// 	.then((response) => response.json())
		// 	.then((value) => value[0].exchangeRate)
		// this.price = this.price * this.transfer
		// console.log(this.price)
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

const getData = async (url) => {
	const res = await fetch(url)
	if (!res.ok) {
		throw new Error(`Could not fetch ${url}, status ${res.status}`)
	}
	const transfer = await fetch('http://localhost:3000/transfer')
	if (!transfer.ok) {
		throw new Error(`Could not fetch for transfer, status ${transfer.status}`)
	}
	const awaitRes = await res.json()
	const awaitTransfer = await transfer.json()
	awaitRes.forEach((item) => {
		item.transfer = awaitTransfer[0].exchangeRate
	})
	data = [...awaitRes]

	return data
}

getData('http://localhost:3000/menu').then((data) => {
	data.forEach(({ img, title, altimg, descr, price, transfer }) => {
		new MenuCard(title, img, altimg, descr, price, transfer, '.menu__field .container', 'menu__item', 'big').render()
	})
})

//*работа с сервером и формами отправки

const forms = document.querySelectorAll('form')
const message = {
	loading: '/icons/spinner.svg',
	success: 'success',
	fail: 'something gone wrong',
}

forms.forEach((item) => {
	bindPostData(item)
})

const postData = async (url, data) => {
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: data,
	})

	return await res.json()
}

function bindPostData(form) {
	form.addEventListener('submit', (e) => {
		e.preventDefault()

		let statusMessage = document.createElement('img')
		statusMessage.src = message.loading
		statusMessage.style.cssText = `
			display: block;
			margin: 0 auto;
		`

		const formData = new FormData(form)

		const object = JSON.stringify(Object.fromEntries(formData.entries()))

		form.insertAdjacentElement('afterend', statusMessage)

		postData('http://localhost:3000/requests', object)
			.then((data) => {
				console.log(data)
				showThanksModal(message.success)
				form.reset()
				statusMessage.remove()
			})
			.catch(() => {
				showThanksModal(message.fail)
			})
			.finally(() => {
				form.reset()
				statusMessage.remove()
			})
	})
}

//*оповещение пользователя модальным окном после отправки формы

function showThanksModal(message) {
	const prevModalWindow = document.querySelector('.modal__dialog')
	const thanksModal = document.createElement('div')

	prevModalWindow.classList.add('hide')
	toggleModalWindow('show')
	thanksModal.classList.add('modal__dialog')
	thanksModal.innerHTML = `
		<div class="modal__content">
			<div class="modal__close">×</div>
			<div class="modal__title">${message}</div>
		</div>
	`
	document.querySelector('.modal').append(thanksModal)

	setTimeout(() => {
		thanksModal.remove()
		prevModalWindow.classList.add('show')
		prevModalWindow.classList.remove('hide')
		toggleModalWindow('hide')
	}, 2000)
}

//*слайдер
//TODO попроовать засунуть все картинки в сервер и брать картинки с сервера, а не верстки

const slideButtons = document.querySelectorAll('.offer__slider-counter div')
const slides = document.querySelectorAll('.offer__slide')
const sliderWrapper = document.querySelector('.offer__slider-wrapper')
const currentSlide = document.querySelector('#current')
const totalSlides = document.querySelector('#total')
let current = 2

totalSlides.innerHTML = slides.length > 10 ? `${slides.length}` : `0${slides.length}`

const hideSlides = () => {
	slides.forEach((slide) => {
		slide.classList.remove('show')
		slide.classList.add('hide')
	})
}

const showSlides = (i) => {
	if (i + 1 < 10) {
		currentSlide.textContent = `0${i + 1}`
	} else {
		currentSlide.textContent = `${i + 1}`
	}
	slides[i].classList.add('show')
	slides[i].classList.remove('hide')
}

const nextSlide = () => {
	current = current >= slides.length - 1 ? 0 : current + 1
	showSlides(current)
}

const prevSlide = () => {
	current = current <= 0 ? slides.length - 1 : current - 1
	showSlides(current)
}

slideButtons.forEach((button) => {
	button.addEventListener('click', (e) => {
		let target = e.target
		if ((target && target.classList.contains('offer__slider-next')) || target.alt == 'next') {
			hideSlides()
			nextSlide()
		} else if ((target && target.classList.contains('offer__slider-prev')) || target.alt == 'prev') {
			hideSlides()
			prevSlide()
		}
	})
})

hideSlides()
showSlides(current)
