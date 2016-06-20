import { is, List, Map } from 'immutable'

import { retrieveFromStorage } from './Storage'

export const formStartType = (singularKey) => `${singularKey.toUpperCase()}_START`
export const formChangeType = (singularKey) => `${singularKey.toUpperCase()}_CHANGE`
export const formSubmitType = (singularKey) => `${singularKey.toUpperCase()}_SUBMIT`
export const formClearType = (singularKey) => `${singularKey.toUpperCase()}_CLEAR`

export function createReducer({
	singularKey,
	pluralKey,
	validator,
	reducer,
	blankItem,
}) {
	const FORM_START  = formStartType(singularKey)
	const FORM_CHANGE = formChangeType(singularKey)
	const FORM_SUBMIT = formSubmitType(singularKey)
	const FORM_CLEAR  = formSubmitType(singularKey)

	const initialState = {
		[pluralKey]: retrieveFromStorage(pluralKey) || List(),
		forms: Map(),
	}

	const validate = (form, state) => {
		return form.reduce((errors, value, key) => {
			const error = validator(key, value, state)
			return error ? errors.set(key, error) : errors
		}, Map())
	}

	const clearForm = (forms, id) => {
		return forms.set(id, {
			pristine: true,
			errors: Map(),
			form: blankItem,
		})
	}

	const genericReducer = {}

	genericReducer[FORM_START] = (state, action) => {
		if (state.forms.has(action.id)) {
			throw new Error('Form already exists.')
		}

		const item = blankItem.merge(state[pluralKey].find(obj =>
			obj.get('id') === action.id))

		const forms = clearForm(state.forms, action.id)

		return { ...state, forms, }
	}

	// Note: a form change action could be setting some default values
	// automatically (not in response to user input). In this case, they can
	// pass along a defaultSet flag and the form object will not lose its
	// pristine state, nor run validation. This prevents users from seeing
	// validation errors prematurely and making the pristine flag useless.
	genericReducer[FORM_CHANGE] = (state, action) => {
		if (!state.forms.has(action.id)) {
			throw new Error('Form does not exist.')
		}

		const form = state.forms.get(action.id).form.set(action.key, action.value)
		const errors = action.defaultSet ? Map() : validate(form, state)

		const forms = forms.set(action.id, {
			form,
			errors,
			pristine: action.defaultSet ? true : is(form, blankItem)
		})

		return { ...state, form, }
	}

	genericReducer[FORM_SUBMIT] = (state, action) => {
		if (!state.forms.has(action.id)) {
			throw new Error('Form does not exist.')
		}

		const formObj = state.forms.get(action.id)
		if (!formObj.errors.isEmpty()) {
			return state
		}

		if (formObj.pristine) {
			return state
		}

		let newItem = formObj.form.merge({
			id: state[pluralKey].count(),
			createdAt: Date.now(),
			updatedAt: Date.now(),
		})

		if (newItem.has('amount')) {
			newItem = newItem.set('amount', parseFloat(newItem.get('amount')))
		}

		const forms = action.clear ? clearForm(state.forms, action.id) :
			state.forms.delete(action.id)

		return {
			...state,
			[pluralKey]: state[pluralKey].push(newItem),
			forms,
		}
	}

	genericReducer[FORM_CLEAR] = (state, action) => {
		if (!state.forms.has(action.id)) {
			throw new Error('Form does not exist.')
		}

		const forms = clearForm(state.forms, action.id)

		return { ...state, forms, }
	}

	return function(state = initialState, action) {
		if (reducer.hasOwnProperty(action.type)) {
			return reducer[action.type](state, action)
		}

		if (genericReducer.hasOwnProperty(action.type)) {
			return genericReducer[action.type](state, action)
		}

		return state
	}
}
