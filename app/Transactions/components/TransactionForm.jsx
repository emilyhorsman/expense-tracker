import React from 'react'

import FormRow from '~/Shared/components/FormRow'

export default function TransactionForm(props) {
	const { errors, wallets, handleChange } = props

	return (
		<form onSubmit={props.handleSubmit}>
			<FormRow errors={errors.name} label="Name:">
				<input
					className="form-control"
					type="text"
					value={props.name}
					onChange={handleChange.bind(null, 'name')}
				/>
			</FormRow>

			<FormRow errors={errors.amount} label="Amount:">
				<input
					className="form-control"
					type="number"
					step="any"
					value={props.amount}
					placeholder={10}
					onChange={handleChange.bind(null, 'amount')}
				/>
			</FormRow>

			<FormRow errors={errors.walletId} label="Wallet:">
				<select
					className="c-select form-control"
					value={props.walletId}
					onChange={handleChange.bind(null, 'walletId')}
				>
					<option value=''></option>
					{Object.keys(wallets).map(id =>
						<option
							key={id}
							value={id}
						>{wallets[id].get('name')}</option>
					)}
				</select>
			</FormRow>

			<div>
				<button
					className="btn btn-primary"
					disabled={props.disabled}
				>Submit</button>
			</div>
		</form>
	)
}
