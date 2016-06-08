import { createSelector } from 'reselect'

export const getWallets = (state) => state.WalletsDomain.wallets
export const getWalletEdits = (state) => state.WalletsDomain.editWallets
