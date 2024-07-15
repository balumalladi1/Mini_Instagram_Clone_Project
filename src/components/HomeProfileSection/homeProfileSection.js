import {Component} from react

import {Cookies} from "cookie-js"

class HomeProfileSection extends Component{
    state={
        homeStories:[]
    }

    componentDidMount(){
        this.getDetails()
    }

    getDetails = () =>{
        const url="https://apis.ccbp.in/insta-share/stories"

        const jwtToken = Cookies.get("jwt_token")
        const options={
            method:"GET",
            headers:{
                Authorization:`Bearer ${jwtToken}`
            }
        }

        const response = await fetch(url,options)
        const data = await response.json()
        if (response.ok) {
            const homeStories= data.users_stories.map(each =>({
                userstoryid:each.user_id,
                userstoryname:each.user_name,
                userstoryurl:each.story_url
        }))
        }
    }

    render() {
        const {homeStories} = this.state 
        return (
            <div>
                {homeStories.map(each=>(
                    <p>{each.username}</p>
                ))}
            </div>
        )
    }
}