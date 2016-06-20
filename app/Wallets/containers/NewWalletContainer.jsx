import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getWalletForm } from '../selectors'
import * as actions from '../actions'

import WalletForm from '../components/WalletForm'
const currencyCodes = require('~/data/CurrencyCodes.json')

class NewWalletContainer extends Component {
	componentDidMount() {
		this.props.actions.walleForm.change('currency', this.props.defaultCurrencyCode, {
			defaultSet: true,
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		this.props.actions.walletForm.start(-1)
	}

	getValue(key, event) {
		return event.target.value
	}

	handleChange(key, event) {
		const value = this.getValue(key, event)
		this.props.actions.walletForm.change(-1, key, value)
	}

	render() {
		const { walletForm, defaultCurrencyCode } = this.props

		return (
			<WalletForm
				{...walletForm.form.toObject()}
				errors={walletForm.errors.toObject()}
				disabled={!walletForm.errors.isEmpty() || walletForm.pristine}
				handleSubmit={this.handleSubmit.bind(this)}
				handleChange={this.handleChange.bind(this)}
				currencyCodes={currencyCodes}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		walletForm: getWalletForm(state, -1),
		defaultCurrencyCode: state.SettingsDomain.settings.get('currency'),
	}
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
