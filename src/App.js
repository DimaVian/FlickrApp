import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      pictures: [],
    };
  }
componentDidMount=()=>{
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=aabca25d8cd75f676d3a74a72dcebf21&tags=nyc&per_page=25&page=1&format=json&nojsoncallback=1')
    .then(function(response){
      return response.json();
    })
    .then(function(j){
      let picArray = j.photos.photo.map((pic) => {
        
        var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
        return(
          <img alt="pics" src={srcPath}></img>
        )
      })
      this.setState({pictures: picArray});
    }.bind(this))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to the Flickr Gallery</h1>
        </header>
        <button className='button'>
          <a className='a' onClick={this.componentDidMount}>Fetch Recent Photos</a>
          </button>
        <div >
          <div className='pictures' >{this.state.pictures}</div>
        </div>
      </div>
    );
  }
}

export default App;