import { List, Map } from 'immutable'

import { createReducer } from '~/helpers/Reducers'

const newWallet = Map({
	name: '',
	currency: '',
	amount: 0,
})

const validator = (key, value) => {
	return false
}

const WalletsDomain = {}

export default createReducer({
	blankItem: newWallet,
	singularKey: 'wallet',
	pluralKey: 'wallets',
	validator,
	reducer: WalletsDomain,
})
