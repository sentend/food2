import { toggleModalWindow } from '/js/modules/modal'
import { postData } from '../services/services'

export default function forms(formSelector, timerId) {
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

			postData('http://localhost:3000/requests', object)
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
		toggleModalWindow('show', '.modal', timerId)
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
			toggleModalWindow('hide', '.modal')
		}, 2000)
	}
}
