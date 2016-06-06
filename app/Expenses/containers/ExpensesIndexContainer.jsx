import React, { Component } from 'react'
import { connect } from 'react-redux'

import NewExpenseContainer from './NewExpenseContainer'
import Expense from '../components/Expense'

class ExpensesIndexContainer extends Component {
	render() {
		const { expenses } = this.props

		return (
			<main>
				<NewExpenseContainer />

				<ol>
					{expenses.map(expense =>
						<Expense {...expense.toObject()} />
					)}
				</ol>
			</main>
		)
	}
}

ExpensesIndexContainer.defaultProps = {
	expenses: [],
}

const mapStateToProps = (state) => {
	return {
		expenses: state.ExpensesDomain.expenses.toArray(),
	}
}

export default connect(
	mapStateToProps
)(ExpensesIndexContainer)
