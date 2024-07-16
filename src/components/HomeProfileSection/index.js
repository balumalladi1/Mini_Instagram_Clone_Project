import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'

class HomeProfileSection extends Component {
  state = {
    profiledetails: {},
  }

  componentDidMount() {
    this.getDetails()
  }

  getFormattedData = data => ({
    id: data.id,
    userId: data.user_id,
    userName: data.user_name,
  })

  getDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {userId} = params
    const url = `https://apis.ccbp.in/insta-share/users/${userId}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedprofiledetails = this.getFormattedData(data)

      this.setState({profiledetails: updatedprofiledetails})
    }
  }

  render() {
    const {profiledetails} = this.state
    const {id, userName} = profiledetails
    return (
      <div>
        <Header />
        <p>{userName}</p>
        console.log(profiledetails)
        <p> Here My Details are Showing</p>
      </div>
    )
  }
}

export default HomeProfileSection
