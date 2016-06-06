import React from 'react'

export default function Expense({ amount, description, date }) {
	return (
		<li>
			{date} – {amount}
			<div>{description}</div>
		</li>
	)
}
