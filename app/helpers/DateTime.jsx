function padDateComponent(comp) {
	if (comp.toString().length === 1) {
		return '0' + comp
	}

	return comp
}

export function inputDateTypeFormat(date) {
	return `${date.getFullYear()}-${padDateComponent(date.getMonth() + 1)}-${padDateComponent(date.getDate())}`
}

export function getFormattedDefaultDate() {
	return inputDateTypeFormat(new Date())
}

export function isValidDate(date) {
	const _d = date.split('-')
	if (_d.length !== 3) {
		return false
	}

	return _d.every(comp => parseInt(comp) == comp)
}
