import { createSelector } from 'reselect'

export const getTransactions = (state) => state.TransactionsDomain.transactions
export const getTransactionForms = (state) => state.TransactionsDomain.forms
export const getTransactionForm = (state, id) => getTransactionForms(state).get(id)

export const getOpenTransactionForms = createSelector(
	getTransactions,
	getTransactionForms,
	(transactions, forms) => forms.filter((formObj, id) => transactions.has(id))
)
