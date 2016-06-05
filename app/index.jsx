import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Router, IndexRedirect, Route, browserHistory } from 'react-router'

import App from './App/containers/App'
import NotFound from './App/components/NotFound'
import ExpensesIndex from './Expenses/containers/ExpensesIndex'

render(
	<Router history={browserHistory}>

		<Route path="/" component={App}>
			<IndexRedirect to="expenses" />

			<Route path="expenses" component={ExpensesIndex} />

			<Route path="*" component={NotFound} />
		</Route>

	</Router>
, document.getElementById('app'))
