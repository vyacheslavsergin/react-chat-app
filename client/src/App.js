import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginPageComponent from './app/login-page/login-page-component'
import ChatPageComponent from './app/chat-page/chat-page-component'

function App() {

  let routes = (
    <Switch>
      <Route path="/" exact component={LoginPageComponent}/>
      <Route path="/chat" exact component={ChatPageComponent}/>
      <Redirect to="/"/>
    </Switch>
  )

  return (
    <React.Fragment>
      {routes}
    </React.Fragment>
  )
}

export default App
