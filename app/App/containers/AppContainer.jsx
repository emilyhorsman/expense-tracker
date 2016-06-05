import React, { Component, cloneElement } from 'react'
import { connect } from 'react-redux'

import SettingsPanelContainer from '~/Settings/containers/SettingsPanelContainer'

class AppContainer extends Component {
	render() {
		const { children, currency } = this.props
		const childProps = {}

		return (
			<div>
				<SettingsPanelContainer />

				{React.Children.map(children, child => cloneElement(child, childProps))}
			</div>
		)
	}
}

AppContainer.propTypes = {
	children: React.PropTypes.node,
}

export default AppContainer
