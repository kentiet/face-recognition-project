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
import Clarifai from 'clarifai'

const app = new Clarifai.App({
  apiKey: 'a130d7cd2b35429ea59c17e5ebe6f778'
  // apiKey: 'YOUR API KEY'
 });

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
class App extends Component {

  constructor() {
    super();
    this.state = {
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

  calculateFaceLocation = (data) => {
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
    app.models.predict('53e1df302c079b3db8a0a36033ed2d15', this.state.input)
    .then(res => this.displayFaceBox(this.calculateFaceLocation(res)))
    .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
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
          ? <div> <Logo />
          <Rank />
          <ImageLinkForm 
            onInputChange={this.onInputChange}
            onButtonSubmit = {this.onButtonSubmit}
          />
          <FaceRecognition box={box} imgUrl={imgUrl}/>
          </div>
          : (
            route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange}/> 
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
          )  
        }
      </div>
    );
  }
}

export default App;
