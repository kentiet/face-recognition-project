import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js'
import { Component } from 'react';
import Clarifai from 'clarifai'

const app = new Clarifai.App({
  // apiKey: 'a130d7cd2b35429ea59c17e5ebe6f778'
  apiKey: 'YOUR API KEY'
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
      imgUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }
  
  onButtonSubmit = () => {
    this.setState({imgUrl: this.state.input})
    // console.log('click')
    app.models.predict('53e1df302c079b3db8a0a36033ed2d15', this.state.input).then((err, res) => {
      if (err) console.error(err)  
      console.log(res.outputs[0].data.regions[0].region_info.bounding_box)
    })
  }

  render() {
    return (
      <div className="App">
        <Particles 
          className='particles'
          params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit = {this.onButtonSubmit}
        />
        <FaceRecognition imgUrl={this.state.imgUrl}/>
      </div>
    );
  }
}

export default App;
