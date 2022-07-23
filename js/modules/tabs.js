export default function tabs(tabContent, tabsSelector, tabParent, activeClass) {
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
