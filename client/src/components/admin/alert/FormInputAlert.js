



const FormInputAlert = ({ alert }) => {
    return (
        <div className="form-input-alert">
            { alert && alert.length ? (<span className="text-danger">{alert}</span>) : null }
        </div>
    )
}


export default FormInputAlert