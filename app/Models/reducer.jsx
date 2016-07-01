import { Map } from 'immutable'

import { retrieveFromStorage } from '~/helpers/Storage'

const getRecords = (state, model) => {
	if (state.hasOwnProperty(model)) {
		return state[model]
	}

	console.warn(`No records for ${model}, initializing an immutable Map.`)
	return Map()
}

const reducer = {}
reducer.ADD_RECORD = (state, { model, record }) => {
	if (!Map.isMap(record)) {
		throw new Error(`ADD_RECORD on ${model} was dispatched with a record that was not an immutable Map.`)
	}

	const records = getRecords(state, model)

	// Using Strings for keys due to JSON storage.
	const id = ((records.maxBy((_, k) => parseInt(k)) || 0) + 1).toString()

	return {
		...state,
		[model]: records.set(id, record)
	}
}

reducer.EDIT_RECORD = (state, { model, id, key, value }) => {
	const records = getRecords(state, model)

	return {
		...state,
		[model]: records.setIn([id, key], value)
	}
}

reducer.DELETE_RECORD = (state, { model, id }) => {
	const records = getRecords(state, model)

	return {
		...state,
		[model]: records.delete(id)
	}
}

const initialState = retrieveFromStorage('models')
const Models = (state = initialState, action) => {
	if (typeof reducer[state.type] === 'function') {
		return reducer[state.type](state, action)
	}

	return state
}

export default Models