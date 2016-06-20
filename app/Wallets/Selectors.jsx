import { createSelector } from 'reselect'

export const getWallets = (state) => state.WalletsDomain.wallets
export const getWalletForms = (state) => state.WalletsDomain.forms
export const getWalletForm = (state, id) => getWalletForms(state).get(id)

export const getOpenWalletForms = createSelector(
	getWallets,
	getWalletForms,
	(wallets, forms) => forms.filter((formObj, id) => wallets.has(id))
)
