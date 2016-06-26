export const getAggregate = (amount, transactionData) => transactionData.reduce((aggregate, transaction) => {
	const sign = transaction.get('transactionType') === 'expense' ? -1 : 1
	return aggregate + (transaction.get('amount') * sign)
}, amount)
