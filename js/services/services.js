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

const getData = async (url) => {
	const res = await fetch(url)
	if (!res.ok) {
		throw new Error(`Could not fetch ${url}, status ${res.status}`)
	}
	const transfer = await fetch('http://localhost:3000/transfer')
	if (!transfer.ok) {
		throw new Error(`Could not fetch for transfer, status ${transfer.status}`)
	}
	const awaitRes = await res.json()
	const awaitTransfer = await transfer.json()
	awaitRes.forEach((item) => {
		item.transfer = awaitTransfer[0].exchangeRate
	})
	const data = [...awaitRes]

	return data
}

export { postData, getData }
