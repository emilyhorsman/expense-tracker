import React from 'react'

export default function TransactionTable(props) {
	return (
		<table className="table">
			<thead>
				<tr>
					<th>Amount</th>
					<th>Date</th>
					<th>Wallet</th>
					<th>Name</th>
					<th>
						<span className="sr-only">Actions</span>
					</th>
				</tr>
			</thead>

			<tbody>
				{props.children}
			</tbody>
		</table>
	)
}
