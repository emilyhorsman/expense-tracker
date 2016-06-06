import React from 'react'

function validationErrors(errors) {
	if (!errors) {
		return null
	}

	return <div>{errors}</div>
}

export default function NewExpenseForm(props) {
	const { errors } = props

	return (
		<form onSubmit={props.handleSubmit}>
			<div className={errors.description ? 'error' : ''}>
				<label>
					Description:
					<input
						type="text"
						value={props.description}
						placeholder="What’d you spend money on?"
						onChange={props.handleChange.bind(null, 'description')}
					/>
				</label>

				{validationErrors(errors.description)}
			</div>

			<div className={errors.amount ? 'error' : ''}>
				<label>
					Amount:
					<input
						type="number"
						min={0}
						value={props.amount}
						placeholder={0}
						onChange={props.handleChange.bind(null, 'amount')}
					/>
				</label>

				{validationErrors(errors.amount)}
			</div>

			<div className={errors.date ? 'error' : ''}>
				<label>
					Date:
					<input
						type="date"
						value={props.date}
						onChange={props.handleChange.bind(null, 'date')}
					/>
				</label>

				{validationErrors(errors.date)}
			</div>

			<div>
				<button
					disabled={props.disabled}
				>Submit</button>
			</div>
		</form>
	)
}
