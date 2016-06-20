import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getWalletForm } from '../selectors'
import { walletForm } from '../actions'

import WalletForm from '../components/WalletForm'
const currencyCodes = require('~/data/CurrencyCodes.json')

class WalletFormContainer extends Component {
	componentDidMount() {
		this.setCurrency()
	}

	setCurrency() {
		const { setDefault, actions, formId, defaultCurrencyCode } = this.props
		if (!setDefault) {
			return
		}

		actions.form.change(formId, 'currency', defaultCurrencyCode, {
			defaultSet: true,
		})
	}

	handleSubmit(event) {
		event.preventDefault()

		this.props.actions.form.submit(this.props.formId, this.props.clear)
		this.setCurrency()
	}

	getValue(key, event) {
		return event.target.value
	}

	handleChange(key, event) {
		const value = this.getValue(key, event)
		this.props.actions.form.change(this.props.formId, key, value)
	}

	render() {
		const { walletForm, defaultCurrencyCode } = this.props

		if (!walletForm) {
			return null
		}

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

WalletFormContainer.defaultProps = {
	clear: false,
	setDefault: false,
}

const mapStateToProps = (state, ownProps) => {
	return {
		walletForm: getWalletForm(state, ownProps.formId),
		defaultCurrencyCode: state.SettingsDomain.settings.get('currency'),
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: {
			form: bindActionCreators(walletForm, dispatch),
		},
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WalletFormContainer)
