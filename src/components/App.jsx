import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './ImageFinder/Searchbar'
import Loader from './ImageFinder/Loader'


class App extends Component {
  state = {
    searchName: '',
  }

  handlFormSubmit = (searchName) => {
    this.setState({searchName})
  };


  render() {
    
    return (
      <>
        <Searchbar onSubmit={this.handlFormSubmit} />
        <Loader searchName={ this.state.searchName } />
        <ToastContainer autoClose={3000}/>
      </>
    );
  }
}

export default App;
