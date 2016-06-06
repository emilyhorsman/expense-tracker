import { is, List, Map } from 'immutable'
import { inputDateTypeFormat } from '~/helpers/DateTime'

const newExpense = Map({
	description: '',
	amount: 0,
	date: inputDateTypeFormat(new Date()),
})

const initialExpensesDomain = {
	expenses: List(),
	newExpense: {
		pristine: true,
		errors: Map(),
		form: newExpense,
	},
}

const _validate = (key, value) => {
	if (key === 'amount' && value <= 0) {
		return 'Must be greater than zero!'
	}

	if (key === 'description' && value === 'foo') {
		return 'Should not be foo'
	}

	return null
}

const validate = (form) => {
	return form.reduce((errors, value, key) => {
		const error = _validate(key, value)
		return error ? errors.set(key, error) : errors
	}, Map())
}

const ExpensesDomain = (state = initialExpensesDomain, action) => {
	switch (action.type) {
		case 'NEW_EXPENSE_CHANGE':
			const form = state.newExpense.form.set(action.key, action.value)
			const errors = validate(form)

			return {
				...state,
				newExpense: {
					...state.newExpense,
					form,
					errors,
					pristine: is(state.newExpense.form, initialExpensesDomain.newExpense.form),
				},
			}
		case 'NEW_EXPENSE_SUBMIT':
			if (state.newExpense.errors.count() > 0) {
				return state
			}

			if (state.newExpense.pristine) {
				return state
			}

			const newItem = state.newExpense.form.set('id', state.expenses.count())

			return {
				...state,
				expenses: state.expenses.push(newItem),
				newExpense: initialExpensesDomain.newExpense,
			}
		default:
			return state
	}
}

export default ExpensesDomain
