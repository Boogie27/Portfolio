



const FormInputAlert = ({ position, alert }) => {
    return (
        <div className={`form-input-alert ${position}`}>
            { alert && alert.length ? (<span className="text-danger">{alert}</span>) : null }
        </div>
    )
}


export default FormInputAlert