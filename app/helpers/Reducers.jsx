import { is, List, Map } from 'immutable'

import { retrieveFromStorage } from './Storage'

export function createReducer({
	singularKey,
	pluralKey,
	validator,
	reducer,
	blankItem,
}) {
	const NEW_FORM_CHANGE = `NEW_${singularKey.toUpperCase()}_CHANGE`
	const NEW_FORM_SUBMIT = `NEW_${singularKey.toUpperCase()}_SUBMIT`
	const EDIT_FORM_START = `EDIT_${singularKey.toUpperCase()}_START`
	const EDIT_FORM_CHANGE = `EDIT_${singularKey.toUpperCase()}_CHANGE`
	const EDIT_FORM_SUBMIT = `EDIT_${singularKey.toUpperCase()}_SUBMIT`
	const newFormKey = 'new' + singularKey.charAt(0).toUpperCase() + singularKey.slice(1)
	const editFormKey = 'edit' + pluralKey.charAt(0).toUpperCase() + pluralKey.slice(1)

	const initialState = {
		[pluralKey]: retrieveFromStorage(pluralKey) || List(),
		[newFormKey]: {
			pristine: true,
			errors: Map(),
			form: blankItem,
		},
		[editFormKey]: Map(),
	}

	const validate = (form, state) => {
		return form.reduce((errors, value, key) => {
			const error = validator(key, value, state)
			return error ? errors.set(key, error) : errors
		}, Map())
	}

	return function(state = initialState, action) {
		if (reducer.hasOwnProperty(action.type)) {
			return reducer[action.type](state, action)
		}

		// Note: a form change action could be setting some default values
		// automatically (not in response to user input). In this case, they can
		// pass along a defaultSet flag and the form object will not lose its
		// pristine state, nor run validation. This prevents users from seeing
		// validation errors prematurely and making the pristine flag useless.
		switch (action.type) {
			case NEW_FORM_CHANGE:
				const form = state[newFormKey].form.set(action.key, action.value)
				const errors = action.defaultSet ? Map() : validate(form, state)

				return {
					...state,
					[newFormKey]: {
						...state[newFormKey],
						form,
						errors,
						pristine: action.defaultSet ? true : is(state[newFormKey].form, initialState[newFormKey].form),
					}
				}

			case NEW_FORM_SUBMIT:
				if (!state[newFormKey].errors.isEmpty()) {
					return state
				}

				if (state[newFormKey].pristine) {
					return state
				}

				let newItem = state[newFormKey].form.merge({
					id: state[pluralKey].count(),
					createdAt: Date.now(),
					updatedAt: Date.now(),
				})

				if (newItem.has('amount')) {
					newItem = newItem.set('amount', parseFloat(newItem.get('amount')))
				}

				return {
					...state,
					[pluralKey]: state[pluralKey].push(newItem),
					[newFormKey]: initialState[newFormKey],
				}

			case EDIT_FORM_START:
				// Already have a form open for this item.
				if (state[editFormKey].has(action.id)) {
					return state
				}

				const item = state[pluralKey].find(obj => obj.get('id') === action.id)
				if (!item) {
					return state
				}

				const forms = state[editFormKey].set(action.id, {
					pristine: true,
					errors: Map(),
					form: blankItem.merge(item),
				})

				return {
					...state,
					[editFormKey]: forms,
				}

			case EDIT_FORM_CHANGE:
				const curForm = state[editFormKey].get(action.id).form
				const nextForm = curForm.set(action.key, action.value)
				const editErrors = action.defaultSet ? Map() : validate(nextForm, state)

				return {
					...state,
					[editFormKey]: state[editFormKey].set(action.id, {
						form: nextForm,
						errors: editErrors,
						pristine: action.defaultSet ? true : is(nextForm, state[pluralKey].find(obj => obj.get('id') === action.id)),
					}),
				}

			case EDIT_FORM_SUBMIT:
				const curItem = state[pluralKey].get(action.id)
				const form = state[editFormKey].get(action.id).form
				const nextItem = curItem.merge(form).merge({
					updatedAt: Date.now(),
				})

				return {
					...state,
					[pluralKey]: state[pluralKey].set(action.id, nextItem),
				}

			default:
				return state
		}
	}
}
