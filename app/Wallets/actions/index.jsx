export function handleNewWalletChange(key, value, action = {}) {
	return {
		type: 'NEW_WALLET_CHANGE',
		key,
		value,
		...action,
	}
}

export function handleNewWalletSubmit() {
	return {
		type: 'NEW_WALLET_SUBMIT',
	}
}
