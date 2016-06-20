import { List } from 'immutable'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { transactionForm } from '../actions'
import { getMergedTransactions, getOpenTransactionForms } from '../selectors'
import TransactionTable from '../components/TransactionTable'
import TransactionRow from '../components/TransactionRow'
import TransactionFormContainer from './TransactionFormContainer'

class TransactionIndex extends Component {
	onEdit(id) {
		this.props.actions.transactionForm.start(id)
	}

	onCancel(id) {
		this.props.actions.transactionForm.cancel(id)
	}

	render() {
		const { transactions, forms } = this.props

		const rows = transactions.reduce((acc, transaction, id) => {
			const editing = forms.has(id)

			const childProps = {
				onAction: editing ? this.onCancel.bind(this, id) : this.onEdit.bind(this, id),
				actionLabel: editing ? 'Cancel' : 'Edit',
			}

			const base = (
				<TransactionRow
					key={`${id}__tease`}
					{...transaction.toObject()}
					{...childProps}
				/>
			)

			if (!editing) {
				return acc.push(base)
			}

			const form = (
				<TransactionRow key={`${id}__form`}>
					<TransactionFormContainer
						formId={id}
					/>
				</TransactionRow>
			)

			return acc.push(base, form)
		}, List())

		return (
			<div>
				<TransactionTable>
					{rows}
				</TransactionTable>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		transactions: getMergedTransactions(state),
		forms: getOpenTransactionForms(state),
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: {
			transactionForm: bindActionCreators(transactionForm, dispatch),
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(TransactionIndex)
