import { List, Map } from 'immutable'

import { createReducer } from '~/helpers/Reducers'
const currencyCodes = require('~/data/CurrencyCodes.json')

const newWallet = Map({
	name: '',
	currency: '',
	amount: 0,
})

const validator = (key, value, state) => {
	if (key === 'name' && value.trim() === '') {
		return 'Cannot be a blank name';
	}

	if (key === 'name' &&
		state.wallets.some(wallet => wallet.name === value)) {
			return 'A wallet with that name already exists'
	}

	if (key === 'currency' && !currencyCodes.includes(value)) {
		return 'Not a valid currency code'
	}

	return false
}

const WalletsDomain = {}
WalletsDomain.NEW_EXPENSE_SUBMIT = (state, action) => {
	return {
		...state,
		wallets: state.wallets.map(wallet => {
			if (wallet.get('id') !== action.form.get('walletId')) {
				return wallet
			}
			
			const newAmount = wallet.get('amount') - action.form.get('amount')
			return wallet.set('amount', newAmount)
		}),
	}
}

export default createReducer({
	blankItem: newWallet,
	singularKey: 'wallet',
	pluralKey: 'wallets',
	validator,
	reducer: WalletsDomain,
})
