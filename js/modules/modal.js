export default function modal() {
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
}
