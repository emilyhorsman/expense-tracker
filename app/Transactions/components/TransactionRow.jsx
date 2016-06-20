import React from 'react'

import { formatCurrency } from '~/helpers/Currency'

export default function TransactionRow(props) {
	if (React.isValidElement(props.children)) {
		return (
			<tr>
				<td colSpan="5">
					{React.Children.only(props.children)}
				</td>
			</tr>
		)
	}

	return (
		<tr>
			<td>{formatCurrency(props.amount, props.walletData.currency)}</td>
			<td>{props.date}</td>
			<td>{props.walletData.name}</td>
			<td>{props.name}</td>
			<td>
				<button
					className="btn btn-sm btn-secondary"
					type="button"
					onClick={props.onAction}
				>{props.actionLabel}</button>
			</td>
		</tr>
	)
}
