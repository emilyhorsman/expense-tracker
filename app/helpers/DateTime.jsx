function padDateComponent(comp) {
	if (comp.toString().length === 1) {
		return '0' + comp
	}

	return comp
}

export function inputDateTypeFormat(date) {
	return `${date.getFullYear()}-${padDateComponent(date.getMonth() + 1)}-${padDateComponent(date.getDate())}`
}
