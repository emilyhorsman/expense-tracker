import React from 'react'

import { formatCurrency } from '~/helpers/Currency'

export default function Wallet({ name, currency, amount }) {
	return (
		<li>
			{name} holds {formatCurrency(amount, currency)}
		</li>
	)
}
