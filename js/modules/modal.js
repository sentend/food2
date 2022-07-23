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

export default modal
export { toggleModalWindow }
