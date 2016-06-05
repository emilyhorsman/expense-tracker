import { Map } from 'immutable'

const initialSettingsDomain = {
	settings: Map({
		currency: 'CAD',
	}),
}

const SettingsDomain = (state = initialSettingsDomain, action) => {
	switch (action.type) {
		default:
			return state
	}
}

export default SettingsDomain
