import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {BsHeart, BsChevronLeft, BsChevronRight} from 'react-icons/bs'

import {BiMessageRounded} from 'react-icons/bi'

import Cookies from 'js-cookie'

import './index.css'

import {Link} from 'react-router-dom'

import Header from '../Header'

const imageList = [
  {
    id: 1,
    imageUrl:
      'https://res.cloudinary.com/dlbodeuso/image/upload/v1719102733/Rectangle_1663_xgbjqm.png',
    name: 'Dog',
  },
  {
    id: 2,
    imageUrl:
      'https://res.cloudinary.com/dlbodeuso/image/upload/v1719102738/Rectangle_1667_jsqjuz.png',
    name: 'Trees',
  },
  {
    id: 3,
    imageUrl:
      'https://res.cloudinary.com/dlbodeuso/image/upload/v1719102738/Rectangle_1671_qzgs0i.png',
    name: 'Trees',
  },
  {
    id: 4,
    imageUrl:
      'https://res.cloudinary.com/dlbodeuso/image/upload/v1719102738/Rectangle_1673_htq3xv.png',
    name: 'Trees',
  },
  {
    id: 5,
    imageUrl:
      'https://res.cloudinary.com/dlbodeuso/image/upload/v1719102738/Rectangle_1673_htq3xv.png',
    name: 'Trees',
  },
  {
    id: 6,
    imageUrl:
      'https://res.cloudinary.com/dlbodeuso/image/upload/v1719102738/Rectangle_1671_qzgs0i.png',
    name: 'Trees',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    profilelist: [],
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedProfileData = data.posts.map(each => ({
        id: each.post_id,
        userId: each.user_id,
        username: each.user_name,
        profilepic: each.profile_pic,
        userimage: each.post_details.image_url,
        likescount: each.likes_count,
        caption: each.post_details.caption,
        createdat: each.created_at,
      }))

      console.log(data)

      console.log(updatedProfileData)
      this.setState({
        profilelist: updatedProfileData,

        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderdetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHomeList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderHomeList = () => {
    const {profilelist} = this.state
    const {userId} = profilelist

    return (
      <div>
        {profilelist.map(each => (
          <>
            <Link to={`/users/${each.userId}`} className="insideStory">
              <img src={each.profilepic} alt="user profile" />
              <p>{each.username}</p>
            </Link>
            <img src={each.userimage} alt="images" className="image-post" />
            <div className="like-section">
              <BsHeart size="30" className="styling-1" />
              <BiMessageRounded size="35" />
            </div>
            <div className="likes-section">
              <p>{each.likescount}</p>
              <p>likes</p>
            </div>
            <p />

            <p className="caption-section">{each.caption}</p>
            <p className="caption-section">{each.createdat}</p>
          </>
        ))}
      </div>
    )
  }

  renderFailureView = () => (
    <div className="error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" data-testid="button" onClick={this.getDetails}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    return (
      <>
        <Header />
        <ul className="top_section">
          <BsChevronLeft />
          {imageList.map(each => (
            <li>
              <img src={each.imageUrl} alt="post author profile" />
              <p>{each.name}</p>
            </li>
          ))}
          <BsChevronRight />
        </ul>
        <hr />
        {this.renderdetails()}
      </>
    )
  }
}

export default Home
