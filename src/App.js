import React, { Component } from 'react';
import ParticlesOptions from './components/Particles/Particles';
import Navigation from './components/navigation/navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/logo/logo'
import Rank from './components/Rank/rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      celebrity: {},
      box: {},
    }
  }

  calculateFaceLocation = (data) => {
    const clarifyFace = JSON.parse(data, null, 2).outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifyFace.left_col * width,
      topRow: clarifyFace.top_row * height,
      rightCol: width - (clarifyFace.right_col * width),
      bottomRow: height - (clarifyFace.bottom_row * height)
    }
    
  }

  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box: box})
  }

  defineCelebrity = (data) => {
    const clarifyCelebrity = JSON.parse(data, null, 2).outputs[0].data.concepts[0]
    return {
      celebrity: clarifyCelebrity.name,
      probability: Math.round(clarifyCelebrity.value * 100)+'%',
    }
  }

  displayCelebrity = (celebrity) => {
    console.log(celebrity)
    this.setState({celebrity: celebrity})
  }
  
  onInputChange = (event) => {
      this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch("https://api.clarifai.com/v2/models/celebrity-face-recognition/outputs", 
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key 5a697d65358d41ae9b20d917828ea05a'
      },
      body: JSON.stringify({
        user_app_id: {
          user_id: "htzgqfj5bccw",
          app_id: "Gleb-application"
        },
        inputs: [
          {data: 
            {image: 
              {url: this.state.input}
            }
          }
        ]
      })
    },
    )
    .then(response => response.text())
    .then(result => this.displayCelebrity(this.defineCelebrity(result)))
    .catch(error => console.log('error', error))
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", 
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key 5a697d65358d41ae9b20d917828ea05a'
      },
      body: JSON.stringify({
        user_app_id: {
          user_id: "htzgqfj5bccw",
          app_id: "Gleb-application"
        },
        inputs: [
          {data: 
            {image: 
              {url: this.state.input}
            }
          }
        ]
      })
    },
    )
    .then(response => response.text())
    .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
    .catch(error => console.log('error', error))
  };  

  render() {
    return (
      <div className="App">
        <ParticlesOptions />
        <Navigation />
        <Logo/>
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} celebrity={this.state.celebrity} />
      </div>
    );
  }
}

export default App;
