import { Map, List } from 'immutable'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { walletForm } from '../actions'
import { getMergedWallets, getOpenWalletForms } from '../selectors'
import Wallet from '../components/Wallet'
import WalletFormContainer from './WalletFormContainer'

class WalletIndex extends Component {
	onEdit(id) {
		this.props.actions.form.start(id)
	}

	onCancel(id) {
		this.props.actions.form.cancel(id)
	}

	render() {
		const { wallets, forms } = this.props

		const items = wallets.reduce((acc, wallet, id) => {
			const editing = forms.has(id)

			const childProps = {
				onAction: editing ? this.onCancel.bind(this, id) : this.onEdit.bind(this, id),
				actionLabel: editing ? 'Cancel' : 'Edit',
			}

			const base = (
				<Wallet
					{...wallet.toObject()}
					{...childProps}
					key={`${id}__tease`}
				/>
			)

			if (!editing) {
				return acc.push(base)
			}

			const form = (
				<WalletFormContainer
					formId={id}
					key={`${id}__form`}
				/>
			)

			return acc.push(base, form)
		}, List())

		return (
			<ul className="media-list">
				{items}
			</ul>
		)
	}
}

WalletIndex.defaultProps = {
	wallets: Map(),
}

const mapStateToProps = (state) => {
	return {
		wallets: getMergedWallets(state),
		forms: getOpenWalletForms(state),
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
	mapDispatchToProps,
)(WalletIndex)
