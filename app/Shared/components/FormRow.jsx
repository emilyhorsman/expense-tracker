import React from 'react'

function validationErrors(errors) {
	if (!errors) {
		return null
	}

	return <span className="help is-danger">{errors}</span>
}

export default function FormRow({ label, errors, children }) {
	return (
		<div className={errors ? 'errors control' : 'control'}>
			<label className="label">
				{label}
				{children}
			</label>

			{validationErrors(errors)}
		</div>
	)
}
