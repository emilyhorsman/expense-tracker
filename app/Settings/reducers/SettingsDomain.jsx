import { Map } from 'immutable'

import { retrieveFromStorage } from '~/helpers/Storage'

const initialSettingsDomain = {
	settings: retrieveFromStorage('settings') || Map({
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
