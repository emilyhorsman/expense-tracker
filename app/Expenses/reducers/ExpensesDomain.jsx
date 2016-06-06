import { List, Map } from 'immutable'

import { createReducer } from '~/helpers/Reducers'
import { inputDateTypeFormat } from '~/helpers/DateTime'

const newExpense = Map({
	description: '',
	amount: 0,
	date: inputDateTypeFormat(new Date()),
	walletId: -1,
})

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
	blankItem: newExpense,
	singularKey: 'expense',
	pluralKey: 'expenses',
	validator,
	reducer: ExpensesDomain,
})
