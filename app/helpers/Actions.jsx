import {
	formStartType,
	formChangeType,
	formSubmitType,
	formClearType,
} from './Reducers'

export function createFormActions({
	singularKey,
}) {
	const actions = {}

	actions.start = (id, action = {}) => {
		return {
			type: formStartType(singularKey),
			id,
			...action,
		}
	}

	actions.change = (id, key, value, action = {}) => {
		return {
			type: formChangeType(singularKey),
			id,
			key,
			value,
			...action,
		}
	}

	actions.submit = (id, clear, action = {}) => {
		return {
			type: formSubmitType(singularKey),
			id,
			clear,
			...action,
		}
	}

	actions.clear = (id, action = {}) => {
		return {
			type: formClearType(singularKey),
			id,
			clear,
			...action,
		}
	}

	return actions
}
