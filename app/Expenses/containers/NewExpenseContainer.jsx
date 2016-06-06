import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions'

import ExpenseForm from '../components/ExpenseForm'

class NewExpenseContainer extends Component {
	handleSubmit(event) {
		event.preventDefault()
		this.props.actions.handleNewExpenseSubmit({
			form: this.props.newExpense.form
		})
	}

	getValue(key, event) {
		if (key === 'walletId') {
			return parseInt(event.target.value)
		}

		return event.target.value
	}

	handleChange(key, event) {
		const value = this.getValue(key, event)
		this.props.actions.handleNewExpenseChange(key, value)
	}

	render() {
		const { newExpense, wallets } = this.props

		const disabled = (
			wallets.isEmpty() ||
			!newExpense.errors.isEmpty() ||
			newExpense.pristine ||
			!Number.isInteger(newExpense.form.get('walletId'))
		)

		return (
			<ExpenseForm
				{...newExpense.form.toObject()}
				errors={newExpense.errors.toObject()}
				disabled={disabled}
				wallets={wallets.toArray()}
				handleSubmit={this.handleSubmit.bind(this)}
				handleChange={this.handleChange.bind(this)}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		newExpense: state.ExpensesDomain.newExpense,
		wallets: state.WalletsDomain.wallets,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(actions, dispatch),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(NewExpenseContainer)
