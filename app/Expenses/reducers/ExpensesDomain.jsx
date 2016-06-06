import { List, Map } from 'immutable'

import { createReducer } from '~/helpers/Reducers'
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

const validator = (key, value) => {
	if (key === 'amount' && value <= 0) {
		return 'Must be greater than zero!'
	}

	if (key === 'description' && value === 'foo') {
		return 'Should not be foo'
	}

	return false
}

const ExpensesDomain = {}

export default createReducer({
	initialState: initialExpensesDomain,
	singularKey: 'expense',
	pluralKey: 'expenses',
	validator,
	reducer: ExpensesDomain,
})
