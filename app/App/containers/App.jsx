import { Component } from 'react'

class App extends Component {
	render() {
		return this.props.children
	}
}

App.propTypes = {
  children: React.PropTypes.node,
}

export default App
