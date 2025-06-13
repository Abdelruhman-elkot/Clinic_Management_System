import './TextField.css'

function TextField({label, type, placeholder, value, onChange}) {

    return(
        <div className="mb-3">
            <label className="form-label"> {label}</label>
            <input
                type={type} 
                className="form-control"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            ></input>
        </div>
    );
}

export default TextField;