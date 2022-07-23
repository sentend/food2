export default function slider({ container, slide, buttonsSlide, totalCunter, currentCounter, wrapper, field }) {
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
