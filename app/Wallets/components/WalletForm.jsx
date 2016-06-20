import React from 'react'

import FormRow from '~/Shared/components/FormRow'

export default function WalletForm(props) {
	const { errors, handleChange } = props

	return (
		<form onSubmit={props.handleSubmit}>
			<FormRow errors={errors.name} label="Name:">
				<input
					type="text"
					className="input"
					value={props.name}
					onChange={handleChange.bind(null, 'name')}
				/>
			</FormRow>

			<FormRow errors={errors.amount} label="Amount:">
				<input
					type="number"
					className="input"
					step="any"
					value={props.amount}
					placeholder={100}
					onChange={handleChange.bind(null, 'amount')}
				/>
			</FormRow>

			<FormRow errors={errors.currency} label="Currency:">
				<span className="select">
					<select
						value={props.currency}
						onChange={handleChange.bind(null, 'currency')}
					>
						{props.currencyCodes.map(code =>
							<option key={code} value={code}>{code}</option>
						)}
					</select>
				</span>
			</FormRow>

			<div>
				<button
					className="button"
					disabled={props.disabled}
				>Submit</button>
			</div>
		</form>
	)
}
