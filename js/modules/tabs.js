export default function tabs() {
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
}
