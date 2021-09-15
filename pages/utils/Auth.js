import { Component } from "react";
import { useSelector } from "react-redux";
import Index from '..'
const withAuth = Component => {
    const Auth = (props) => {
        const {user} = useSelector(state => state.user)
        if(Object.keys(user).length > 0){
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