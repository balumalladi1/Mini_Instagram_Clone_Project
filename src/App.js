import './App.css'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import HomeProfileSection from './components/HomeProfileSection'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route exact path="/users/:userId" component={HomeProfileSection} />
  </Switch>
)

export default App
