export default function timer() {
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
}
