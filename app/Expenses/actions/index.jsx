export function handleNewExpenseChange(key, value) {
	return {
		type: 'NEW_EXPENSE_CHANGE',
		key,
		value,
	}
}

export function handleNewExpenseSubmit() {
	return {
		type: 'NEW_EXPENSE_SUBMIT',
	}
}
