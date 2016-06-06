import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from '../actions'

import ExpenseForm from '../components/ExpenseForm'

class NewExpenseContainer extends Component {
	handleSubmit(event) {
		event.preventDefault()
		this.props.actions.handleNewExpenseSubmit()
	}

	getValue(key, event) {
		if (key === 'amount') {
			return parseFloat(event.target.value)
		}

		return event.target.value
	}

	handleChange(key, event) {
		const value = this.getValue(key, event)
		this.props.actions.handleNewExpenseChange(key, value)
	}

	render() {
		return (
			<ExpenseForm
				{...this.props.form.toObject()}
				errors={this.props.errors.toObject()}
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
