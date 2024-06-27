export function Input({placeholder, value, onChange}) {

	return <div>
		<input type="search"
			   className="form-control"
			   value={value}
			   placeholder={placeholder}
			   onChange={(e) => onChange(e.target.value)} />
	</div>

}