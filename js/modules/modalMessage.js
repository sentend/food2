//*оповещение пользователя модальным окном после отправки формы

export default function modalMessage() {
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
}
