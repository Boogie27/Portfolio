



const FormInputAlert = ({ alert }) => {
    return (
        <div className="admin-form-input-alert">
            { alert && alert.length ? (<span className="text-danger">{alert}</span>) : null }
        </div>
    )
}


export default FormInputAlert