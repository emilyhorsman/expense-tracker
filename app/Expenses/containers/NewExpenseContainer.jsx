import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions'

import NewExpenseForm from '../components/NewExpenseForm'

class NewExpenseContainer extends Component {
	handleSubmit(event) {
		event.preventDefault()
		this.props.actions.handleNewExpenseSubmit()
	}

	handleChange(key, event) {
		this.props.actions.handleNewExpenseChange(key, event.target.value)
	}

	render() {
		return (
			<NewExpenseForm
				{...this.props.form.toObject()}
				disabled={this.props.errors.count() > 0 || this.props.pristine}
				handleSubmit={this.handleSubmit.bind(this)}
				handleChange={this.handleChange.bind(this)}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return state.ExpensesDomain.newExpense
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators(actions, dispatch),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(NewExpenseContainer)
