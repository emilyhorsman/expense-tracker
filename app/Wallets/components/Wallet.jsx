import React from 'react'

import { formatCurrency } from '~/helpers/Currency'

export default function Wallet({ name, currency, amount, onAction, actionLabel }) {
	return (
		<li className="media">
			<div className="media-body">
				<h4 className="media-heading">{name}</h4>
				holds {formatCurrency(amount, currency)}
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
