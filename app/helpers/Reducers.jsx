import { is, List, Map } from 'immutable'

export function createReducer({
	singularKey,
	pluralKey,
	validator,
	reducer,
	blankItem,
}) {
	const FORM_CHANGE = `NEW_${singularKey.toUpperCase()}_CHANGE`
	const FORM_SUBMIT = `NEW_${singularKey.toUpperCase()}_SUBMIT`
	const formKey = 'new' + singularKey.charAt(0).toUpperCase() + singularKey.slice(1)

	const initialState = {
		[pluralKey]: List(),
		[formKey]: {
			pristine: true,
			errors: Map(),
			form: blankItem,
		},
	}

	const validate = (form, state) => {
		return form.reduce((errors, value, key) => {
			const error = validator(key, value, state)
			return error ? errors.set(key, error) : errors
		}, Map())
	}

	return function(state = initialState, action) {
		if (reducer.hasOwnProperty(action.type)) {
			return reducer(state, action)
		}

		switch (action.type) {
			case FORM_CHANGE:
				const form = state[formKey].form.set(action.key, action.value)
				const errors = action.defaultSet ? Map() : validate(form, state)

				return {
					...state,
					[formKey]: {
						...state[formKey],
						form,
						errors,
						pristine: action.defaultSet ? true : is(state[formKey].form, initialState[formKey].form),
					}
				}

			case FORM_SUBMIT:
				if (state[formKey].errors.count() > 0) {
					return state
				}

				if (state[formKey].pristine) {
					return state
				}

				const newItem = state[formKey].form.set('id', state[pluralKey].count())

				return {
					...state,
					[pluralKey]: state[pluralKey].push(newItem),
					[formKey]: initialState[formKey],
				}

			default:
				return state
		}
	}
}
