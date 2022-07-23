/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ calc)
/* harmony export */ });
function calc() {
	//*калькулятор калорий

	const kalResult = document.querySelector('.calculating__result span')
	let age, height, weight, activity, gender

	if (localStorage.getItem('gender')) {
		gender = localStorage.getItem('gender')
	} else {
		gender = 'female'
		localStorage.setItem('gender', gender)
	}

	if (localStorage.getItem('activity')) {
		activity = +localStorage.getItem('activity')
	} else {
		activity = 1.375
		localStorage.setItem('activity', activity)
	}

	function initLocalSettings(parentSelector, activeClass) {
		const elements = document.querySelectorAll(`${parentSelector} div`)

		elements.forEach((button) => {
			button.classList.remove(activeClass)
			if (button.getAttribute('id') === localStorage.getItem('gender')) {
				button.classList.add(activeClass)
			}

			if (button.getAttribute('data-ratio') === localStorage.getItem('activity')) {
				button.classList.add(activeClass)
			}
		})
	}

	function calcTotal() {
		if (!age || !height || !weight) {
			kalResult.textContent = `____`
			return
		} else if (gender == 'female') {
			kalResult.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * activity)
		} else {
			kalResult.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * activity)
		}
	}

	function getStaticInformation(parentSelector, activeClass) {
		const elements = document.querySelectorAll(`${parentSelector} div`)

		elements.forEach((button) =>
			button.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					activity = +e.target.getAttribute('data-ratio')
					localStorage.setItem('activity', activity)
				} else {
					gender = e.target.getAttribute('id')
					localStorage.setItem('gender', gender)
				}

				elements.forEach((button) => {
					button.classList.remove(activeClass)
				})
				e.target.classList.add(activeClass)

				calcTotal()
			})
		)
	}

	function getInputInformation(selector) {
		const input = document.querySelector(selector)
		input.addEventListener('input', () => {
			if (input.value.match(/\D/g)) {
				input.style.border = '1px solid red'
			} else {
				input.style.border = 'none'
			}

			switch (selector) {
				case '#height':
					height = +input.value
					break
				case '#weight':
					weight = +input.value
					break
				case '#age':
					age = +input.value
					break
			}
			calcTotal()
		})
	}

	initLocalSettings('#gender', 'calculating__choose-item_active')
	initLocalSettings('.calculating__choose_big', 'calculating__choose-item_active')

	getStaticInformation('#gender', 'calculating__choose-item_active')
	getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active')

	getInputInformation('#height')
	getInputInformation('#weight')
	getInputInformation('#age')

	calcTotal()
}


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ forms)
/* harmony export */ });
/* harmony import */ var _js_modules_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../js/modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, timerId) {
	//*работа с сервером и формами отправки и окно с оповещением пользователя

	const forms = document.querySelectorAll(formSelector)
	const message = {
		loading: '/icons/spinner.svg',
		success: 'success',
		fail: 'something gone wrong',
	}

	forms.forEach((item) => {
		bindPostData(item)
	})

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

			;(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', object)
				.then((data) => {
					console.log(data)
					thanksModal(message.success)
					form.reset()
					statusMessage.remove()
				})
				.catch(() => {
					thanksModal(message.fail)
				})
				.finally(() => {
					form.reset()
					statusMessage.remove()
				})
		})
	}

	function thanksModal(message) {
		const prevModalWindow = document.querySelector('.modal__dialog')
		const thanksModal = document.createElement('div')

		prevModalWindow.classList.add('hide')
		;(0,_js_modules_modal__WEBPACK_IMPORTED_MODULE_0__.toggleModalWindow)('show', '.modal', timerId)
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
			;(0,_js_modules_modal__WEBPACK_IMPORTED_MODULE_0__.toggleModalWindow)('hide', '.modal')
		}, 2000)
	}
}


/***/ }),

/***/ "./js/modules/menuCard.js":
/*!********************************!*\
  !*** ./js/modules/menuCard.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ menuCard)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function menuCard() {
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

	(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getData)('http://localhost:3000/menu').then((data) => {
		data.forEach(({ img, title, altimg, descr, price, transfer }) => {
			new MenuCard(title, img, altimg, descr, price, transfer, '.menu__field .container', 'menu__item', 'big').render()
		})
	})
}


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "toggleModalWindow": () => (/* binding */ toggleModalWindow)
/* harmony export */ });
function toggleModalWindow(toggle, modalSelector, modalTimerId) {
	const modalWindow = document.querySelector(modalSelector)
	if (toggle == 'show') {
		modalWindow.classList.remove('hide')
		modalWindow.classList.add('show')
		document.body.style.overflow = 'hidden'

		console.log(modalTimerId)
		if (modalTimerId) {
			clearInterval(modalTimerId)
		}
	} else {
		modalWindow.classList.remove('show')
		modalWindow.classList.add('hide')
		document.body.style.overflow = ''
	}
}

function modal(triggerSelector, modalSelector, modalTimerId) {
	const openModal = document.querySelectorAll(triggerSelector)
	const modalWindow = document.querySelector(modalSelector)

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			toggleModalWindow('show', modalSelector, modalTimerId)
			window.removeEventListener('scroll', showModalByScroll)
		}
	}

	window.addEventListener('scroll', showModalByScroll)

	openModal.forEach((item) => {
		item.addEventListener('click', () => toggleModalWindow('show', modalSelector, modalTimerId))
	})

	modalWindow.addEventListener('click', (e) => {
		if (e.target === modalWindow || e.target.classList.contains('modal__close')) {
			toggleModalWindow('close', modalSelector, modalTimerId)
		}
	})

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && modalWindow.classList.contains('show')) {
			toggleModalWindow('close', modalSelecto, modalTimerId)
		}
	})
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ slider)
/* harmony export */ });
function slider({ container, slide, buttonsSlide, totalCunter, currentCounter, wrapper, field }) {
	//*слайдер
	//TODO попроовать засунуть все картинки в сервер и брать картинки с сервера, а не верстки

	const slideButtons = document.querySelectorAll('.offer__slider-counter div')
	const slides = document.querySelectorAll(slide)
	const sliderWrapper = document.querySelector('.offer__slider-wrapper')
	const sliderInner = document.querySelector('.offer__slider-inner')
	const currentSlide = document.querySelector('#current')
	const totalSlides = document.querySelector('#total')
	const width = window.getComputedStyle(sliderWrapper).width
	let offset = 0
	let current = 1

	function optionsForSlider() {
		totalSlides.textContent = slides.length > 10 ? `${slides.length}` : `0${slides.length}`

		sliderInner.style.display = 'flex'
		sliderInner.style.width = 100 * slides.length + '%'
		sliderInner.style.transition = '0.5s all'

		sliderWrapper.style.overflow = 'hidden'

		slides.forEach((slide) => {
			slide.style.width = width
		})
	}

	const changeSlideIndex = (i) => {
		currentSlide.textContent = i > 10 ? `${i}` : `0${i}`
	}

	changeSlideIndex(current)

	if (localStorage.getItem('slideIndex')) {
		changeSlideIndex(+localStorage.getItem('slideIndex'))
		current = +localStorage.getItem('slideIndex')
		offset = +localStorage.getItem('offset')
		sliderInner.style.transform = `translateX(-${offset}px)`
	}

	const nextSlide = () => {
		current = current >= slides.length ? 1 : current + 1
		if (offset == deleteNotDigits(width) * (slides.length - 1)) {
			offset = 0
		} else {
			offset += deleteNotDigits(width)
		}
		localStorage.setItem('offset', offset)
		changeSlideIndex(current)
		localStorage.setItem('slideIndex', current)
		sliderInner.style.transform = `translateX(-${offset}px)`
	}

	const prevSlide = () => {
		current = current == 1 ? slides.length : current - 1
		if (offset == 0) {
			offset = deleteNotDigits(width) * (slides.length - 1)
		} else {
			offset -= deleteNotDigits(width)
		}
		localStorage.setItem('offset', offset)
		changeSlideIndex(current)
		localStorage.setItem('slideIndex', current)
		sliderInner.style.transform = `translateX(-${offset}px)`
	}

	slideButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			let target = e.target
			if ((target && target.classList.contains('offer__slider-next')) || target.alt == 'next') {
				nextSlide()
			} else if ((target && target.classList.contains('offer__slider-prev')) || target.alt == 'prev') {
				prevSlide()
			}
		})
	})

	function deleteNotDigits(string) {
		return +string.replace(/\D/g, '')
	}

	optionsForSlider()
}


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ tabs)
/* harmony export */ });
function tabs(tabContent, tabsSelector, tabParent, activeClass) {
	const tabsContent = document.querySelectorAll(tabContent)
	const tabs = document.querySelectorAll(tabsSelector)
	const tabsParent = document.querySelector(tabParent)

	const hideTabContent = () => {
		tabsContent.forEach((item) => {
			item.classList.add('hide')
			item.classList.remove('show', 'fade')
		})

		tabs.forEach((item) => {
			item.classList.remove(activeClass)
		})
	}

	const showTabContent = (i = 1) => {
		tabsContent[i].classList.remove('hide')
		tabsContent[i].classList.add('show', 'fade')
		tabs[i].classList.add(activeClass)
	}

	hideTabContent()
	showTabContent()

	tabsParent.addEventListener('click', (e) => {
		let target = e.target
		if (target && target.classList.contains(tabsSelector.replace(/\./g, ''))) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent()
					showTabContent(i)
				}
			})
		}
	})
}


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ timer)
/* harmony export */ });
function timer(id, deadline) {
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

	setClock(id, deadline)
}


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
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
	const data = [...awaitRes]

	return data
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../js/modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _js_modules_menuCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../js/modules/menuCard */ "./js/modules/menuCard.js");
/* harmony import */ var _js_modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../js/modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _js_modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../js/modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _js_modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../js/modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _js_modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../js/modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _js_modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../js/modules/timer */ "./js/modules/timer.js");









let timeout = setTimeout(() => {
	(0,_js_modules_modal__WEBPACK_IMPORTED_MODULE_2__.toggleModalWindow)('show', '.modal', timeout)
}, 3000)

;(0,_js_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])()
;(0,_js_modules_menuCard__WEBPACK_IMPORTED_MODULE_1__["default"])()
;(0,_js_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])('[data-modal]', '.modal', timeout)
;(0,_js_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])('form', timeout)
;(0,_js_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({ slide: '.offer__slide' })
;(0,_js_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabcontent', '.tabheader__item', '.tabheader__items', 'tabheader__item_active')
;(0,_js_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2022-07-31')

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map