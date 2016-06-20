import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { transactionForm } from '../actions'
import { getTransactionForm } from '../selectors'
import TransactionForm from '../components/TransactionForm'
import { getWallets } from '~/Wallets/selectors'

class TransactionFormContainer extends Component {
	handleSubmit(event) {
		event.preventDefault()

		this.props.actions.form.submit(this.props.formId, this.props.clear)
	}

	handleChange(key, event) {
		const value = event.target.value

		this.props.actions.form.change(this.props.formId, key, value)
	}

	render() {
		const { transactionForm, wallets } = this.props

		if (!transactionForm) {
			return null
		}

		return (
			<TransactionForm
				{...transactionForm.form.toObject()}
				errors={transactionForm.errors.toObject()}
				disabled={!transactionForm.errors.isEmpty() || transactionForm.pristine}
				handleSubmit={this.handleSubmit.bind(this)}
				handleChange={this.handleChange.bind(this)}
				wallets={wallets.toObject()}
			/>
		)
	}
}

TransactionFormContainer.defaultProps = {
	clear: false,
}

const mapStateToProps = (state, ownProps) => {
	return {
		transactionForm: getTransactionForm(state, ownProps.formId),
		wallets: getWallets(state),
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: {
			form: bindActionCreators(transactionForm, dispatch),
		},
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(TransactionFormContainer)
