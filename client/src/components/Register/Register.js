import React from 'react'

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({registerEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value})
    }
    onNameChange = (event) => {
        this.setState({registerName: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.registerEmail,
                password: this.state.registerPassword,
                name: this.state.registerName
            })
        })
        .then(res => res.json())
        .then(user => {
            if(user) {
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
        })
        
    }

    render(){
        return (
            <div className='center ma'>
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center pa4">
                    <form action="sign-up_submit" method="get" acceptCharset="utf-8">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent w-100 measure" 
                                type="text" 
                                name="name"  
                                id="name" 
                                onChange={this.onNameChange}/>
                        </div>
                        <div className="mt3">
                            <label className="db fw4 lh-copy f6" htmlFor="email">Email address</label>
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
                                value="Sign Up" 
                                onClick={this.onSubmitSignIn}/>
                        </div>
                    </form>
                </article>
            </div>
        );
    }
}

export default Register;