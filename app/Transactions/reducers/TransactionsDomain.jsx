import { Map } from 'immutable'

import { createReducer } from '~/helpers/Reducers'
import { getWallets } from '~/Wallets/selectors'

const newTransaction = Map({
	name: '',
	amount: 0,
	walletId: null,
})

const munge = (item) => {
	return item.set('amount', parseFloat(item.get('amount')))
}

const validator = (id, key, value, state) => {
	if (key === 'name' && value.trim() === '') {
		return 'Cannot be a blank name'
	}

	if (key === 'walletId' && !getWallets(state).has(parseFloat(value))) {
		return 'Wallet does not exist'
	}

	if (key === 'amount' && value === 0) {
		return 'Amount cannot be zero'
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
