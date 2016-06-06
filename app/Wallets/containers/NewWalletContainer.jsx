import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions'

import NewWalletForm from '../components/NewWalletForm'
const currencyCodes = require('~/data/CurrencyCodes.json')

class NewWalletContainer extends Component {
	handleSubmit(event) {
		event.preventDefault()
		this.props.actions.handleNewWalletSubmit()
	}

	getValue(key, event) {
		if (key === 'amount') {
			return parseFloat(event.target.value)
		}

		return event.target.value
	}

	handleChange(key, event) {
		const value = this.getValue(key, event)
		this.props.actions.handleNewWalletChange(key, value)
	}

	render() {
		return (
			<NewWalletForm
				{...this.props.form.toObject()}
				errors={this.props.errors.toObject()}
				disabled={this.props.errors.count() > 0 || this.props.pristine}
				handleSubmit={this.handleSubmit.bind(this)}
				handleChange={this.handleChange.bind(this)}
				currencyCodes={currencyCodes}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return state.WalletsDomain.newWallet
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(actions, dispatch),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewWalletContainer)
