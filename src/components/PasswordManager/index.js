import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    showPasswords: false,
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onToggleShowPassword = () => {
    this.setState(prevState => ({showPasswords: !prevState.showPasswords}))
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state

    if (websiteInput && usernameInput && passwordInput) {
      const newPassword = {
        id: uuidv4(),
        website: websiteInput,
        username: usernameInput,
        password: passwordInput,
      }

      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, newPassword],
        websiteInput: '',
        usernameInput: '',
        passwordInput: '',
      }))
    }
  }

  onDeletePassword = id => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(
        password => password.id !== id,
      ),
    }))
  }

  getFilteredPasswordsList = () => {
    const {passwordsList, searchInput} = this.state
    return passwordsList.filter(passwordItem =>
      passwordItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  renderPasswordForm = () => {
    const {websiteInput, usernameInput, passwordInput} = this.state

    return (
      <div className="password-form-container">
        <form className="form" onSubmit={this.onAddPassword}>
          <h1 className="form-heading">Add New Password</h1>
          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              alt="website"
              className="input-icon"
            />
            <input
              type="text"
              className="input"
              placeholder="Enter Website"
              value={websiteInput}
              onChange={this.onChangeWebsite}
            />
          </div>
          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              alt="username"
              className="input-icon"
            />
            <input
              type="text"
              className="input"
              placeholder="Enter Username"
              value={usernameInput}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              alt="password"
              className="input-icon"
            />
            <input
              type="password"
              className="input"
              placeholder="Enter Password"
              value={passwordInput}
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit" className="add-button">
            Add
          </button>
        </form>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          alt="password manager"
          className="password-manager-image"
        />
      </div>
    )
  }

  renderPasswordsList = () => {
    const {showPasswords} = this.state
    const filteredPasswordsList = this.getFilteredPasswordsList()

    return filteredPasswordsList.length === 0 ? (
      <div className="no-passwords-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
          className="no-passwords-image"
        />
        <p className="no-passwords-text">No Passwords</p>
      </div>
    ) : (
      <ul className="passwords-list">
        {filteredPasswordsList.map(passwordDetails => (
          <PasswordItem
            key={passwordDetails.id}
            passwordDetails={passwordDetails}
            showPassword={showPasswords}
            onDeletePassword={this.onDeletePassword}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {searchInput, showPasswords, passwordsList} = this.state

    return (
      <div className="app-container">
        <div className="password-manager-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          {this.renderPasswordForm()}
          <div className="passwords-container">
            <div className="passwords-header">
              <div className="passwords-count-container">
                <h1 className="your-passwords">Your Passwords</h1>
                <p className="passwords-count">{passwordsList.length}</p>
              </div>
              <div className="search-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>
            <hr className="separator" />
            <div className="show-passwords-container">
              <input
                type="checkbox"
                id="showPasswords"
                className="checkbox"
                checked={showPasswords}
                onChange={this.onToggleShowPassword}
              />
              <label htmlFor="showPasswords" className="checkbox-label">
                Show Passwords
              </label>
            </div>
            {this.renderPasswordsList()}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
