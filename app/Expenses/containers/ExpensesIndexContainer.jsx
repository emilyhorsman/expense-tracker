import React, { Component } from 'react'
import { connect } from 'react-redux'

import NewWalletContainer from '~/Wallets/containers/NewWalletContainer'
import NewExpenseContainer from './NewExpenseContainer'
import Expense from '../components/Expense'
import ExpenseForm from '../components/ExpenseForm'
import Wallet from '~/Wallets/components/Wallet'

class ExpensesIndexContainer extends Component {
	computeAmount(wallet) {
		const id = wallet.get('id')
		return this.props.expenses.reduce((amount, expense) => {
			if (expense.get('walletId') !== id) {
				return amount
			}

			return amount - expense.get('amount')
		}, wallet.get('amount'))
	}

	render() {
		const { expenses, wallets } = this.props

		return (
			<main>
				<NewExpenseContainer />

				<ol>
					{expenses.map(expense =>
						<Expense
							key={expense.get('id')}
							{...expense.toObject()}
						>

						</Expense>
					)}
				</ol>

				<NewWalletContainer />

				<ol>
					{wallets.map(wallet =>
						<Wallet
							key={wallet.get('id')}
							{...wallet.toObject()}
							amount={this.computeAmount(wallet)}
						/>
					)}
				</ol>
			</main>
		)
	}
}

ExpensesIndexContainer.defaultProps = {
	expenses: [],
	currency: 'CAD',
}

const mapStateToProps = (state) => {
	const wallets = state.WalletsDomain.wallets
	const expenses = state.ExpensesDomain.expenses.map(expense => {
		return expense.set('wallet', wallets.find(wallet => wallet.get('id') === expense.get('walletId')))
	})

	return {
		expenses: expenses.toArray(),
		wallets: wallets.toArray(),
	}
}

export default connect(
	mapStateToProps
)(ExpensesIndexContainer)
