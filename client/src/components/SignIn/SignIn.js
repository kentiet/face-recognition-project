import React from 'react'
import './SignIn.css'

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data === 'success') {
                this.props.onRouteChange('home')
            }
        })
        
    }

    render(){
        const {onRouteChange} = this.props
        return (
            <div className='center ma'>
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center pa4">
                    <form action="sign-up_submit" method="get" acceptCharset="utf-8">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent w-100 measure" 
                                type="email" 
                                name="email-address"  
                                id="email-address" 
                                onChange={this.onEmailChange}/>
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent" 
                                type="password" 
                                name="password"  
                                id="password" 
                                onChange={this.onPasswordChange}/>
                        </div>
                        </fieldset>
                        <div className="mt3">
                            <input
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" 
                                type="submit" 
                                value="Sign In" 
                                onClick={ this.onSubmitSignIn}/>
                        </div>
                        <div className="mt3">
                            <input onClick={() => onRouteChange('register')} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Sign Up" />
                        </div>
                    </form>
                </article>
            </div>
        );
    }
} 

export default SignIn;