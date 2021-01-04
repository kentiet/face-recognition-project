import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank'
import SignIn from './components/SignIn/SignIn'
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
      route: 'signin'
    }
  }

  calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const img = document.getElementById('inputImage');
      const width = Number(img.width);
      const height = Number(img.height);
      console.log(width);
      console.log(height);
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

  onRouteChange = () => {
    this.setState({route:'home'})
  }

  render() {
    return (
      <div className="App">
        <Particles 
          className='particles'
          params={particlesOptions} />
        <Navigation />
        { this.state.route === 'signin' 
          ? <SignIn onRouteChange={this.onRouteChange}/> 
          : <div> <Logo />
          <Rank />
          <ImageLinkForm 
            onInputChange={this.onInputChange}
            onButtonSubmit = {this.onButtonSubmit}
          />
          <FaceRecognition box={this.state.box} imgUrl={this.state.imgUrl}/>
          </div>
        }
      </div>
    );
  }
}

export default App;
