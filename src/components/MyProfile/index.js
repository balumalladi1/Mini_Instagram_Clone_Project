import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'

class MyProfile extends Component {
  state = {
    profilelistdetails: [],
    stories: '',
    posts: '',
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const profileData = {
        id: data.profile.id,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
        profilePic: data.profile.profile_pic,
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        userBio: data.profile.user_bio,
        postsCount: data.profile.posts_count,
        posts: data.profile.posts,
        stories: data.profile.stories,
      }

      this.setState({
        profilelistdetails: profileData,
      })
    }
  }

  render() {
    const {profilelistdetail} = this.state

    return (
      <>
        <div>
          <Header />
        </div>

       
      </>
    )
  }
}

export default MyProfile
