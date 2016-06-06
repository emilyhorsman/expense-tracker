import React from 'react'

import { formatCurrency } from '~/helpers/Currency'

export default function Expense({ amount, description, date, currency }) {
	return (
		<li>
			{date} – {formatCurrency(amount, currency)}
			<div>{description}</div>
		</li>
	)
}
