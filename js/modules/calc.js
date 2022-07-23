export default function calc() {
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
