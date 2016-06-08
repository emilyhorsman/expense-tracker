import { createSelector } from 'reselect'

import { getItemById } from '~/helpers/Selectors'
import { getWallets } from '~/Wallets/Selectors'

export const getExpenses = (state) => state.ExpensesDomain.expenses
export const getExpenseEdits = (state) => state.ExpensesDomain.editExpenses

export const getMergedExpenses = createSelector(
	getExpenses,
	getWallets,
	(expenses, wallets) => expenses.map(expense =>
		expense.set('wallet', getItemById(wallets, expense.get('walletId'))))
)
