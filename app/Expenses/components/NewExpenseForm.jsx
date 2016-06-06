import React from 'react'

export default function NewExpenseForm(props) {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<label>
					Description:
					<input
						type="text"
						value={props.description}
						placeholder="What’d you spend money on?"
						onChange={props.handleChange.bind(null, 'description')}
					/>
				</label>
			</div>

			<div>
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
			</div>

			<div>
				<label>
					Date:
					<input
						type="date"
						value={props.date}
						onChange={props.handleChange.bind(null, 'date')}
					/>
				</label>
			</div>

			<div>
				<button
					disabled={props.disabled}
				>Submit</button>
			</div>
		</form>
	)
}
