import { Map } from 'immutable'

import { isValidDate, getFormattedDefaultDate } from '~/helpers/DateTime'
import { createReducer } from '~/helpers/Reducers'
import { getWallets } from '~/Wallets/selectors'

const newTransaction = Map({
	name: '',
	amount: 0,
	date: '',
	walletId: '',
	transactionType: 'expense',
})

const munge = (item) => {
	let _item = item

	_item = _item.set('amount', parseFloat(_item.get('amount')))

	if (!_item.get('date')) {
		_item = _item.set('date', getFormattedDefaultDate())
	}

	return _item
}

const validator = (id, key, value, state) => {
	if (key === 'name' && value.trim() === '') {
		return 'Cannot be a blank name'
	}

	if (key === 'walletId' && value === '') {
		return 'Must select a wallet'
	}

	if (key === 'amount' && value <= 0) {
		return 'Amount must be greater than zero'
	}

	if (key === 'date' && !isValidDate(value)) {
		return 'Invalid date, try ' + getFormattedDefaultDate()
	}

	return false
}

const TransactionsDomain = {}

export default createReducer({
	blankItem: newTransaction,
	singularKey: 'transaction',
	pluralKey: 'transactions',
	validator,
	munge,
	reducer: TransactionsDomain,
})
