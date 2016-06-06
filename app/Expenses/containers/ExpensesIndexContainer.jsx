import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import NewWalletContainer from '~/Wallets/containers/NewWalletContainer'
import NewExpenseContainer from './NewExpenseContainer'
import Expense from '../components/Expense'
import ExpenseForm from '../components/ExpenseForm'
import Wallet from '~/Wallets/components/Wallet'

import { mergeEditItems } from '~/helpers/Reducers'
import * as expenseActions from '../actions'
import * as walletActions from '~/Wallets/actions'

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

	handleEditStart(id) {
		this.props.expenseActions.handleEditExpenseStart(id)
	}

	handleEditSubmit(id, event) {
		event.preventDefault()
		this.props.expenseActions.handleEditExpenseSubmit(id)
	}

	handleEditChange(id, key, event) {
		this.props.expenseActions.handleEditExpenseChange(id, key, event.target.value)
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
							{expense.get('edit') ?
								<ExpenseForm
									{...expense.get('edit').form.toObject()}
									errors={expense.get('edit').errors.toObject()}
									disabled={expense.get('edit').pristine}
									wallets={wallets}
									handleSubmit={this.handleEditSubmit.bind(this, expense.get('id'))}
									handleChange={this.handleEditChange.bind(this, expense.get('id'))}
								/> :
								<button
									type="button"
									onClick={this.handleEditStart.bind(this, expense.get('id'))}
								>Edit</button>
							}
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
		expenses: mergeEditItems(state.ExpensesDomain.editExpenses, expenses).toArray(),
		wallets: mergeEditItems(state.WalletsDomain.editWallets, wallets).toArray(),
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		walletActions: bindActionCreators(walletActions, dispatch),
		expenseActions: bindActionCreators(expenseActions, dispatch),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExpensesIndexContainer)
