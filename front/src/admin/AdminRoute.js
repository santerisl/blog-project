import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import { Route } from 'react-router-dom'

import { AdminContext } from './AdminContext'

class AdminRoute extends Component {

  render() {
    const ctx = this.context
    const isLoggedIn = ctx.user.name !== undefined
    if(isLoggedIn) {
        return <Route {...this.props} />
    } else {
        return <Redirect to={{ pathname: '/login' }} /> 
    }
  }
}

AdminRoute.contextType = AdminContext;

export default AdminRoute;
