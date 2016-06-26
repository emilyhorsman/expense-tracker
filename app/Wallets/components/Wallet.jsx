import React from 'react'

import { formatCurrency } from '~/helpers/Currency'
import { getAggregate } from '~/Transactions/helpers'

export default function Wallet({ transactionData, name, currency, amount, onAction, actionLabel }) {
	return (
		<li className="media">
			<div className="media-body">
				<h4 className="media-heading">{name}</h4>
				holds {formatCurrency(getAggregate(amount, transactionData), currency)}
			</div>

			<div className="media-right">
				<button
					className="btn btn-sm btn-secondary"
					type="button"
					onClick={onAction}
				>{actionLabel}</button>
			</div>
		</li>
	)
}
