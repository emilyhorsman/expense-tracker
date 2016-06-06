export function handleNewWalletChange(key, value) {
	return {
		type: 'NEW_WALLET_CHANGE',
		key,
		value,
	}
}

export function handleNewWalletSubmit() {
	return {
		type: 'NEW_WALLET_SUBMIT',
	}
}
