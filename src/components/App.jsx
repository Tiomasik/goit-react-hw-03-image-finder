import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner'

import Searchbar from './ImageFinder/Searchbar'
//import Loader from './ImageFinder/Loader'
import Button from './ImageFinder/Button'
import ImageGallery from './ImageFinder/ImageGallery'
import Modal from './ImageFinder/Modal'

class App extends Component {
  state = {
    id: null,
    searchName: '',
    arrayModal: [],
    status: 'idle',
    page: 1,
    arraySearch: [],
  }

  handlFormSubmit = (searchName) => {
    this.setState({searchName, page: 1, arraySearch: []})
  };

  choseItem = (id) => {
    console.log(id)
    // this.togleModal()
    this.setState(state => ({
      openModal: true,
      arrayModal: state.arraySearch.filter(search => search.id === id),
    }))
    // this.setState({ openModal: true })
    // console.log(this.state.arraySearch.filter(search => search.id === id))
  }

  onClose = () => {
    this.setState({ openModal: false})
  }

  

  loadMore = () => {
    console.log(this.state.page)
        this.setState(prevState => ({
          page: prevState.page + 1,
          searchName: prevState.searchName
        }));
  }
  
  componentDidUpdate(prevProps, prevState) {
    // console.log(this.state.page)
    // console.log(this.state.searchName)
    // console.log(prevState.searchName)
    if (prevState.page !== this.state.page) {
      this.setState({status: 'pending-more'})
    }
    if (prevState.searchName !== this.state.searchName) {
        this.setState({ status: 'pending'})
    }
      
    if (prevState.searchName !== this.state.searchName || prevState.page !== this.state.page) {
          console.log('status')
            fetch(`https://pixabay.com/api/?q=${this.state.searchName}&page=${this.state.page}&key=31299915-b383d5b151d1dc364952a6f73&image_type=photo&orientation=horizontal&per_page=12`)
              .then(response => response.json())
              .then(searchInfo => {
                if (searchInfo.hits.length !== 0 && searchInfo.hits.length === 12) {
                  return  this.setState({ arraySearch: [...this.state.arraySearch, ...searchInfo.hits], status: 'resolved'})
                }
                if (searchInfo.hits.length !== 0 && searchInfo.hits.length < 12) {
                  return  this.setState({ arraySearch: [...this.state.arraySearch, ...searchInfo.hits], status: 'finish'})
                }
                this.setState({ status: 'rejected' })
                return Promise.reject(
                  new Error("Sory, no result!")
                )
              })
              .catch((error) => {
                this.setState({error, status: 'rejected' })
                // return new Error(toast.error("Sory, no result!"))
              })
    }
    
  }

  render() {

    const { arraySearch, status, error, openModal, arrayModal } = this.state
    // console.log(openModal)
    console.log(status)
    // if (status === 'openModal') {
    //   return <>
    //     <Modal img={arrayModal[0]} onClose=/>
    //   </>
    // }
      
       if (status === 'idle') {
         return <>
           <Searchbar onSubmit={this.handlFormSubmit} />
           <ToastContainer autoClose={3000} />
         </>
    }

    if (status === 'finish') {
         return <>
          <Searchbar onSubmit={this.handlFormSubmit} />
          <ImageGallery choseItem={this.choseItem} listSearch={arraySearch} />
          {openModal&&<Modal img={arrayModal[0]} onClose={this.onClose} />}
          <ToastContainer autoClose={3000} />
         </>
    }

    if (status === 'rejected') {
         return <>
           <Searchbar onSubmit={this.handlFormSubmit} />
           {!arraySearch.length && <h1 className='Error'>{error.message}</h1>}
           {arraySearch.length && <ImageGallery choseItem={this.choseItem} listSearch={arraySearch} />}
          <ToastContainer autoClose={3000} />
         </>
    }
    
        if (status === 'pending') {
          return <>
            <Searchbar onSubmit={this.handlFormSubmit} />
            <div className='Spinner'><ThreeDots /></div>
            <ToastContainer autoClose={3000} />
            </>
    }

    if (status === 'resolved') {
      return <>
        <Searchbar onSubmit={this.handlFormSubmit} />
        <ImageGallery choseItem={this.choseItem} listSearch={arraySearch} />
        <Button loadMore={this.loadMore} />
        {openModal && <Modal img={arrayModal[0]} onClose={this.onClose} />}
        <ToastContainer autoClose={3000} />
      </>
    }

    // img={arrayModal[0]} onClose={this.togleModal}
    
    if (status === 'pending-more') {
      return <>
        <Searchbar onSubmit={this.handlFormSubmit} />
        <ImageGallery choseItem={this.choseItem} listSearch={arraySearch} />
        <div className='Spinner'><ThreeDots /></div>
        <ToastContainer autoClose={3000} />
      </>
    }
    
  }
}

export default App;
