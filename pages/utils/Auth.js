import { Component } from "react";
import Index from '..'
const withAuth = Component => {
    const Auth = (props) => {
        if(Object.keys(props.user).length > 0){
            return <Component {...props}/>
        }
        return <Index/>
    }
    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
      }
    
      return Auth;
}

export default withAuth;