export function handleNewExpenseChange(key, value) {
	return {
		type: 'NEW_EXPENSE_CHANGE',
		key,
		value,
	}
}

export function handleNewExpenseSubmit(action = {}) {
	return {
		type: 'NEW_EXPENSE_SUBMIT',
		...action
	}
}

export function handleEditExpenseChange(id, key, value) {
	return {
		type: 'EDIT_EXPENSE_CHANGE',
		id,
		key,
		value,
	}
}

export function handleEditExpenseSubmit(id) {
	return {
		type: 'EDIT_EXPENSE_SUBMIT',
		id,
	}
}

export function handleEditExpenseStart(id) {
	return {
		type: 'EDIT_EXPENSE_START',
		id,
	}
}
