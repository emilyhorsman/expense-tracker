import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Map } from 'immutable'

import SettingsPanel from '../components/SettingsPanel'

class SettingsPanelContainer extends Component {
	render() {
		return <SettingsPanel {...this.props.settings.toObject()} />
	}
}

SettingsPanelContainer.defaultProps = {
	settings: Map(),
}

const mapStateToProps = (state) => {
	return {
		settings: state.SettingsDomain.settings,
	}
}

export default connect(
	mapStateToProps,
)(SettingsPanelContainer)
