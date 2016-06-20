import React from 'react'

function validationErrors(errors) {
	if (!errors) {
		return null
	}

	return <div><small className="text-muted">{errors}</small></div>
}

export default function FormRow({ label, errors, children }) {
	return (
		<div className={errors ? 'has-danger form-group' : 'form-group'}>
			<label>
				{label}
				{children}
			</label>

			{validationErrors(errors)}
		</div>
	)
}
