import { Map } from 'immutable'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { walletForm } from '../actions'
import { getWallets } from '../selectors'
import Wallet from '../components/Wallet'

class WalletIndex extends Component {
	render() {
		const { wallets } = this.props

		return (
			<div>
				{wallets.map((wallet, id) =>
					<Wallet {...wallet.toObject()} key={id} />
				)}
			</div>
		)
	}
}

WalletIndex.defaultProps = {
	wallets: Map(),
}

const mapStateToProps = (state) => {
	return {
		wallets: getWallets(state),
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
