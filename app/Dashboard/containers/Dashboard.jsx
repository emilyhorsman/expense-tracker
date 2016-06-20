import { Map } from 'immutable'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import WalletFormContainer from '~/Wallets/containers/WalletFormContainer'
import WalletIndex from '~/Wallets/containers/WalletIndex'
import { getWalletForm } from '~/Wallets/selectors'
import { walletForm } from '~/Wallets/actions'

class Dashboard extends Component {
	componentDidMount() {
		this.props.actions.walletForm.start('NEW')
	}

	render() {
		const { walletForm } = this.props

		return (
			<div>
				{walletForm &&
					<WalletFormContainer
						formId={'NEW'}
						clear={true}
						setDefault={true}
					/>
				}

				<WalletIndex />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		walletForm: getWalletForm(state, 'NEW'),
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: {
			walletForm: bindActionCreators(walletForm, dispatch),
		},
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Dashboard)
