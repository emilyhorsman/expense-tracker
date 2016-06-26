import { is, Map } from 'immutable'

import { retrieveFromStorage } from './Storage'

export const formStartType = (singularKey) => `${singularKey.toUpperCase()}_START`
export const formChangeType = (singularKey) => `${singularKey.toUpperCase()}_CHANGE`
export const formSubmitType = (singularKey) => `${singularKey.toUpperCase()}_SUBMIT`
export const formClearType = (singularKey) => `${singularKey.toUpperCase()}_CLEAR`
export const formCancelType = (singularKey) => `${singularKey.toUpperCase()}_CANCEL`

export function createReducer({
	singularKey,
	pluralKey,
	validator,
	reducer,
	blankItem,
	munge,
}) {
	const FORM_START  = formStartType(singularKey)
	const FORM_CHANGE = formChangeType(singularKey)
	const FORM_SUBMIT = formSubmitType(singularKey)
	const FORM_CLEAR  = formClearType(singularKey)
	const FORM_CANCEL = formCancelType(singularKey)

	const initialState = {
		[pluralKey]: retrieveFromStorage(pluralKey) || Map(),
		forms: Map(),
	}

	const validate = (id, form, state) => {
		return form.reduce((errors, value, key) => {
			const error = validator(id, key, value, state)
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

	const getNewId = (items) => {
		return (items.reduce((newId, _, id) => {
			if (parseInt(id) > newId) {
				return parseInt(id)
			}

			return newId
		}, -1) + 1).toString()
	}

	const genericReducer = {}

	genericReducer[FORM_START] = (state, action) => {
		if (state.forms.has(action.id)) {
			return state
		}

		const item = blankItem.merge(state[pluralKey].get(action.id))

		const forms = state.forms.set(action.id, {
			pristine: true,
			errors: Map(),
			form: item,
		})

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

		const formObj = state.forms.get(action.id)
		const form = formObj.form.set(action.key, action.value)
		const errors = action.defaultSet ? Map() : validate(action.id, form, state)

		const forms = state.forms.set(action.id, {
			form,
			errors,
			pristine: action.defaultSet ? true : is(form, blankItem)
		})

		return { ...state, forms, }
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

		const existing = state[pluralKey].has(action.id)

		const id = existing ? action.id : getNewId(state[pluralKey])
		const _item = formObj.form.merge({
			createdAt: Date.now(),
			updatedAt: Date.now(),
		})
		const item = (typeof munge === 'function') ? munge(_item) : _item

		const forms = action.clear ? clearForm(state.forms, action.id) :
			state.forms.delete(action.id)

		return {
			...state,
			[pluralKey]: state[pluralKey].set(id, item),
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

	genericReducer[FORM_CANCEL] = (state, action) => {
		if (!state.forms.has(action.id)) {
			throw new Error('Form does not exist.')
		}

		const forms = state.forms.delete(action.id)
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
