import './index.css'

const PasswordItem = props => {
  const {passwordDetails, showPassword, onDeletePassword} = props
  const {id, website, username, password} = passwordDetails

  const initial = website ? website[0].toUpperCase() : ''

  const onClickDelete = () => {
    onDeletePassword(id)
  }

  return (
    <li className="password-item">
      <div className="password-details">
        <div className={`initial-container initial-${id % 10}`}>
          <p className="initial">{initial}</p>
        </div>
        <div className="user-details">
          <p className="website">{website}</p>
          <p className="username">{username}</p>
          {showPassword ? (
            <p className="password">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars-image"
            />
          )}
        </div>
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={onClickDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
