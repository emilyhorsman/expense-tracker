import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { combineReducers, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, IndexRedirect, Route, browserHistory } from 'react-router'

import AppContainer from './App/containers/AppContainer'
import NotFound from './App/components/NotFound'
import ExpensesIndexContainer from './Expenses/containers/ExpensesIndexContainer'

import ExpensesDomain from './Expenses/reducers/ExpensesDomain'
import SettingsDomain from './Settings/reducers/SettingsDomain'
import WalletsDomain from './Wallets/reducers/WalletsDomain'
const reducer = combineReducers({
	ExpensesDomain,
	SettingsDomain,
	WalletsDomain,
})

const devToolsWrapper = window.devToolsExtension ? window.devToolsExtension() : f => f
const createFinalStore = compose(devToolsWrapper)(createStore)
const store = createFinalStore(reducer)

render(
	<Provider store={store}>
		<Router history={browserHistory}>

			<Route path="/" component={AppContainer}>
				<IndexRedirect to="expenses" />

				<Route path="expenses" component={ExpensesIndexContainer} />

				<Route path="*" component={NotFound} />
			</Route>

		</Router>
	</Provider>
, document.getElementById('app'))
