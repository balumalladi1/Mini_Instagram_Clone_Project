import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isShow: false,
    error: '',
  }

  componentDidMount() {
    this.getDetails()
  }

  rendersuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  failure = error => {
    this.setState({error, isShow: true})
  }

  getDetails = async () => {
    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state

    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.rendersuccess(data.jwt_token)
    } else {
      this.failure(data.error_msg)
    }
  }

  userupdate = event => {
    this.setState({username: event.target.value})
  }

  userpasswordupdate = event => {
    this.setState({password: event.target.value})
  }

  submitDetails = event => {
    event.preventDefault()
    this.getDetails()
  }

  render() {
    const {username, password, isShow, error} = this.state

    return (
      <div>
        <div className="LoginMainContainer">
          <img
            src="https://res.cloudinary.com/dlbodeuso/image/upload/v1718886071/Illustration_pm8mzg.png"
            alt="website login"
            className="LoginImage"
          />
          <div>
            <div className="subContainer">
              <img
                src="https://res.cloudinary.com/dlbodeuso/image/upload/v1718886387/logo_cienwq.png"
                alt="website login"
                className="LoginImage1"
              />
              <h1>Insta Share</h1>
              <form className="loginSubContainer" onSubmit={this.submitDetails}>
                <label htmlFor="userId" className="userId">
                  USERNAME
                </label>
                <input
                  type="text"
                  placeholder="Enter user name"
                  value={username}
                  onChange={this.userupdate}
                  id="userId"
                  className="userInput"
                />
                <label htmlFor="userPassword" className="userId">
                  PASSWORD
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={this.userpasswordupdate}
                  id="userPassword"
                  className="userInput"
                />
                <div>
                  <button type="submit">Login</button>
                </div>
                {isShow && <p>*{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
