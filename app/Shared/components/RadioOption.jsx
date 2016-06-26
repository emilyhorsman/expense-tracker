import React from 'react'

export default function RadioOption({ onChange, label, field, value, data }) {
	return (
		<label className="radio-inline">
			<input
				type="radio"
				checked={data === value}
				value={value}
				onChange={onChange.bind(null, field)}
			/>

			{label}
		</label>
	)
}
