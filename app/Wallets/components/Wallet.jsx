import React from 'react'

import { formatCurrency } from '~/helpers/Currency'

export default function Wallet({ name, currency, amount, onAction, actionLabel }) {
	return (
		<li>
			{name} holds {formatCurrency(amount, currency)}

			<button
				type="button"
				onClick={onAction}
			>{actionLabel}</button>
		</li>
	)
}
