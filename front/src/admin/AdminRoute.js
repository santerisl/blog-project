import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'

import { AdminContext } from './AdminContext'

class AdminRoute extends Component {

  render() {
    let ctx = this.context
    let isLoggedIn = ctx.user.name

    if(isLoggedIn) {
        return this.props.children
    } else {
        return <Redirect to={{ pathname: '/login' }} /> 
    }
  }
}

AdminRoute.contextType = AdminContext;

export default AdminRoute;
