import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      pictures: [],
      textInput:'cats'
    };
  }

ReloadImages=()=>{
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=aabca25d8cd75f676d3a74a72dcebf21&tags='+this.state.textInput+'&per_page=25&page=1&format=json&nojsoncallback=1')
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

  HandleChange=(e)=>{
    this.setState({textInput: e.target.value});
  }

  Delay = (function(){
    var timer = 0;
    return function(callback,ms){
      clearTimeout(timer);
      timer = setTimeout(callback,ms);
    }
  })();

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to the Flickr Gallery</h1>
        </header>
        <input className='textInput' onChange={this.HandleChange} 
        onKeyUp={()=> this.Delay(function(){
          this.ReloadImages();
        }.bind(this),1000)}
        />
        <div >
          <div className='pictures' >{this.state.pictures}</div>
        </div>
      </div>
    );
  }
}

export default App;