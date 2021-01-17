import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Particles from 'react-particles-js'
import React, { Component } from 'react';

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 600
      }
    }
  }
}

const initialState = {
  input: '',
  imgUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {

  constructor() {
    super();
    this.state = initialState
  }

  calculateFaceLocation = (data) => {
      console.log(data)
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const img = document.getElementById('inputImage');
      const width = Number(img.width);
      const height = Number(img.height);

      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }
  
  onButtonSubmit = () => {
    this.setState({imgUrl: this.state.input})
    // console.log('click')
    fetch('http://localhost:3000/imageUrl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.input
          })
    })
    .then(response => response.json())
    .then(res => {
      if(res) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(res => res.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
      }
      this.displayFaceBox(this.calculateFaceLocation(res))
    })
    .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  
  loadUser = (data) => {
    this.setState({user: 
      {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  render() {
    const { isSignedIn, imgUrl, route, box} = this.state
    return (
      <div className="App">
        <Particles 
          className='particles'
          params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home' 
          ? (<div> <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm 
            onInputChange={this.onInputChange}
            onButtonSubmit = {this.onButtonSubmit}
          />
          <FaceRecognition box={box} imgUrl={imgUrl}/>
          </div>)
          : (
            route === 'signin'
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
          )  
        }
      </div>
    );
  }
}

export default App;
