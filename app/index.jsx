import 'babel-polyfill'
import './styles.scss'

import React from 'react'
import { render } from 'react-dom'
import { combineReducers, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'

import AppContainer from './App/containers/AppContainer'
import NotFound from './App/components/NotFound'
import Models from '~/Models/reducer'

const reducer = combineReducers({
	Models,
})

const devToolsWrapper = window.devToolsExtension ? window.devToolsExtension() : f => f
const createFinalStore = compose(devToolsWrapper)(createStore)
const store = createFinalStore(reducer)

import { writeToStorage } from './helpers/Storage'
const handleChange = () => {
	const state = store.getState()
}
store.subscribe(handleChange)

render(
	<Provider store={store}>
		<Router history={browserHistory}>

			<Route path="/" component={AppContainer}>

				<Route path="*" component={NotFound} />
			</Route>

		</Router>
	</Provider>
, document.getElementById('app'))
