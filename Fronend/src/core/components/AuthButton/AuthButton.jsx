import './AuthButton.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function AuthButton({ text, onClick, isDisabled, isOutlined = false }) {
    return <button
        type='button'
        className={isOutlined ? "btn btn-outline-secondary w-100" : "btn btn-secondary w-100"}
        onClick={onClick}
        disabled={isDisabled}>
        {text}
    </button>
}

export default AuthButton;