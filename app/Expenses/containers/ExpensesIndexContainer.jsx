import React, { Component } from 'react'
import { connect } from 'react-redux'

import NewWalletContainer from '~/Wallets/containers/NewWalletContainer'
import NewExpenseContainer from './NewExpenseContainer'
import Expense from '../components/Expense'
import Wallet from '~/Wallets/components/Wallet'

class ExpensesIndexContainer extends Component {
	render() {
		const { expenses, currency, wallets } = this.props

		return (
			<main>
				<NewExpenseContainer />

				<ol>
					{expenses.map(expense =>
						<Expense
							key={expense.get('id')}
							currency={currency}
							{...expense.toObject()}
						/>
					)}
				</ol>

				<NewWalletContainer />

				<ol>
					{wallets.map(wallet =>
						<Wallet
							key={wallet.get('id')}
							{...wallet.toObject()}
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
	return {
		expenses: state.ExpensesDomain.expenses.toArray(),
		currency: state.SettingsDomain.currency,
		wallets: state.WalletsDomain.wallets.toArray(),
	}
}

export default connect(
	mapStateToProps
)(ExpensesIndexContainer)
