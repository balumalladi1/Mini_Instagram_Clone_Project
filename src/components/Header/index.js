import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import {BsList} from 'react-icons/bs'

import './index.css'

class Header extends Component {
  render() {
    return (
      <div className="headersection">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dlbodeuso/image/upload/v1719423278/Standard_Collection_8_wl3qrh.png"
            alt="website logo"
          />
        </Link>
        <p className="heading">Instagram</p>
        <BsList height={50} />
      </div>
    )
  }
}

export default withRouter(Header)
