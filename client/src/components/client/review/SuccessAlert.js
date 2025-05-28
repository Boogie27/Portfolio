

const SuccessAlert = () => {
  return (
    <div className="review-form star-form-container">
        <div className="success-alert-container">
            <svg className="checkmark" viewBox="0 0 52 52">
                <circle className="checkmark-circle" cx="26" cy="26" r="25" />
                <path className="checkmark-check" d="M14 27l7 7 17-17" />
            </svg>
            <p className="success-message">Success! Thank you for your review.</p>
        </div>
    </div>
  )
}

export default SuccessAlert;
