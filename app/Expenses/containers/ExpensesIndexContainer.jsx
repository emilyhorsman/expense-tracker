import React, { Component } from 'react'
import { connect } from 'react-redux'

import NewWalletContainer from '~/Wallets/containers/NewWalletContainer'
import NewExpenseContainer from './NewExpenseContainer'
import Expense from '../components/Expense'

class ExpensesIndexContainer extends Component {
	render() {
		const { expenses, currency } = this.props

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
	}
}

export default connect(
	mapStateToProps
)(ExpensesIndexContainer)
