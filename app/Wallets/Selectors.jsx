import { createSelector } from 'reselect'

export const getWallets = (state) => state.WalletsDomain.wallets
export const getWalletForms = (state) => state.WalletsDomain.forms
export const getWalletForm = (state, id) => getWalletForms(state).get(id)

export const getOpenWalletForms = createSelector(
	getWallets,
	getWalletForms,
	(wallets, forms) => forms.filter((formObj, id) => wallets.has(id))
)

export const getMergedWallets = createSelector(
	getWallets,
	(state) => state.TransactionsDomain.transactions,
	(wallets, transactions) => wallets.map((wallet, id) =>
		wallet.set(
			'transactionData',
			transactions.filter(trans => trans.get('walletId') === id)
		)
	)
)
