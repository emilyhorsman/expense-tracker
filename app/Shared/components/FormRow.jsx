import React from 'react'

function validationErrors(errors) {
	if (!errors) {
		return null
	}

	return <div>{errors}</div>
}

export default function FormRow({ label, errors, children }) {
	return (
		<div className={errors ? 'errors' : ''}>
			<label>
				{label}
				{children}
			</label>

			{validationErrors(errors)}
		</div>
	)
}
