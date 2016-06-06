import React from 'react'

import FormRow from '~/FormHelpers/components/FormRow'

export default function NewExpenseForm(props) {
	const { errors } = props

	return (
		<form onSubmit={props.handleSubmit}>
			<FormRow errors={errors.description} label="Description:">
				<input
					type="text"
					value={props.description}
					placeholder="What’d you spend money on?"
					onChange={props.handleChange.bind(null, 'description')}
				/>
			</FormRow>

			<FormRow errors={errors.amount} label="Amount:">
				<input
					type="number"
					min={0}
					step="any"
					value={props.amount}
					placeholder={0}
					onChange={props.handleChange.bind(null, 'amount')}
				/>
			</FormRow>

			<FormRow errors={errors.date} label="Date:">
				<input
					type="date"
					value={props.date}
					onChange={props.handleChange.bind(null, 'date')}
				/>
			</FormRow>

			<div>
				<button
					disabled={props.disabled}
				>Submit</button>
			</div>
		</form>
	)
}
