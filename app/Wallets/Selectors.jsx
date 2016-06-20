import { createSelector } from 'reselect'

export const getWallets = (state) => state.WalletsDomain.wallets
export const getWalletForm = (state, id) => state.WalletsDomain.forms.get(id)
