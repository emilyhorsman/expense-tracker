import { fromJS } from 'immutable'

const storage = window.localStorage

function namespaceKey(key) {
	return '@expense-tracker:' + key
}

export function retrieveFromStorage(key) {
	const k = namespaceKey(key)
	const item = storage.getItem(k)
	if (item === null) {
		return false
	}

	try {
		return fromJS(JSON.parse(item))
	} catch (e) {
		console.log(e)  // eslint-disable-line no-console
		return false
	}
}

export function writeToStorage(key, value) {
	const k = namespaceKey(key)
	const serialized = JSON.stringify(value.toJS())
	storage.setItem(k, serialized)
}
