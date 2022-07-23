export default function services() {
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
}
