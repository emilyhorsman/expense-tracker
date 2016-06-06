export function formatCurrency(amount, currency) {
	return amount.toLocaleString(undefined, { style: 'currency', currency, })
}
