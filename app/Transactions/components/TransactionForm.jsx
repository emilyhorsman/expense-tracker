import React from 'react'

import FormRow from '~/Shared/components/FormRow'
import RadioRow from '~/Shared/components/RadioRow'
import RadioOption from '~/Shared/components/RadioOption'

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

			<RadioRow>
				<RadioOption
					label="Expense"
					value="expense"
					field="transactionType"
					onChange={handleChange}
					data={props.transactionType}
				/>

				<RadioOption
					label="Income"
					value="income"
					field="transactionType"
					onChange={handleChange}
					data={props.transactionType}
				/>
			</RadioRow>

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

			<FormRow errors={errors.date} label="Date:">
				<input
					className="form-control"
					type="date"
					value={props.date}
					onChange={handleChange.bind(null, 'date')}
				/>
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
