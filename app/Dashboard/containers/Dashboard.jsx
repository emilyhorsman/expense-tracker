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
			<div className="row">
				<div className="col-md-6">
					expenses here
				</div>

				<div className="col-md-6">
					{walletForm &&
						<WalletFormContainer
							formId={'NEW'}
							clear={true}
							setDefault={true}
						/>
					}

					<div className="m-y-1">
						<WalletIndex />
					</div>
				</div>
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
