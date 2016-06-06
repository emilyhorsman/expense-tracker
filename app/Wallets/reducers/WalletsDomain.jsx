import { List, Map } from 'immutable'

import { createReducer } from '~/helpers/Reducers'

const newWallet = Map({
	name: '',
	currency: '',
	amount: 0,
})

const initialWalletsDomain = {
	wallets: List(),
	newWallet: {
		pristine: true,
		errors: Map(),
		form: newWallet,
	},
}

const validator = (key, value) => {
	return false
}

const WalletsDomain = {}

export default createReducer({
	initialState: initialWalletsDomain,
	singularKey: 'wallet',
	pluralKey: 'wallets',
	validator: validator,
	reducer: WalletsDomain,
})
