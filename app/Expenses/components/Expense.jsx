import React from 'react'

import { formatCurrency } from '~/helpers/Currency'

export default function Expense({ amount, description, date, wallet }) {
	return (
		<li>
			{date} – {formatCurrency(amount, wallet.get('currency'))} –
			{' '}{wallet.get('name')}

			<div>{description}</div>
		</li>
	)
}
