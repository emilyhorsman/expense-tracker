import React, { Component, cloneElement } from 'react'
import { connect } from 'react-redux'

class AppContainer extends Component {
	render() {
		const { children, currency } = this.props
		const childProps = {}

		return (
			<div className="container-fluid">
				{React.Children.map(children, child => cloneElement(child, childProps))}
			</div>
		)
	}
}

AppContainer.propTypes = {
	children: React.PropTypes.node,
}

export default AppContainer
