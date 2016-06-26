import { Map } from 'immutable'

import { createReducer } from '~/helpers/Reducers'
const currencyCodes = require('~/data/CurrencyCodes.json')

const newWallet = Map({
	name: '',
	currency: '',
	amount: 0,
})

const munge = (item) => {
	let _item = item
	_item = _item.set('amount', parseFloat(item.get('amount')))

	return _item
}

const validator = (id, key, value, state) => {
	if (key === 'name' && value.trim() === '') {
		return 'Cannot be a blank name';
	}

	if (key === 'name' &&
		state.wallets.some((wallet, _id) =>
			_id !== id && wallet.get('name') === value)) {
			return 'A wallet with that name already exists'
	}

	if (key === 'currency' && !currencyCodes.includes(value)) {
		return 'Not a valid currency code'
	}

	return false
}

const WalletsDomain = {}

export default createReducer({
	blankItem: newWallet,
	singularKey: 'wallet',
	pluralKey: 'wallets',
	validator,
	munge,
	reducer: WalletsDomain,
})
