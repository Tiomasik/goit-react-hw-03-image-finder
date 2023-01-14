import React, { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify';

import ImageGallery from './ImageGallery'
// import Button from './Button'


class Loader extends Component {
  state = {
    searchInfo: null,
    status: 'idle',
    page: this.props.page,
    arraySearch: [],
  }

  // loadMore = () => {
  //   this.setState({
  //     page: this.props.page,
  //   });
  // }

  componentDidUpdate(prevProps, prevState) {
    
    console.log(this.state.page)
    if (prevProps.page !== this.props.page && prevProps.searchName === this.props.searchName) {
      this.setState({status: 'pending-more'})
    }
    if (prevProps.searchName !== this.props.searchName) {
        this.setState({ status: 'pending', arraySearch: []})
    }
      
    if (prevProps.searchName !== this.props.searchName || prevProps.page !== this.props.page) {
          
            fetch(`https://pixabay.com/api/?q=${this.props.searchName}&page=${this.props.page}&key=31299915-b383d5b151d1dc364952a6f73&image_type=photo&orientation=horizontal&per_page=12`)
              .then(response => response.json())
              .then(searchInfo => {
                if (searchInfo.hits.length !== 0) {
                  return  this.setState({ arraySearch: [...this.state.arraySearch, ...searchInfo.hits], status: 'resolved' })
                }
                this.setState({ status: 'rejected' })
                return new Error(toast.error("Sory, no result!"))
              })
              .catch(() => {
                this.setState({ status: 'rejected' })
                new Error(toast.error("Sory, no result!"))
              })
    }
    
  }

  render() {
      
    const { arraySearch, status} = this.state
    // console.log(arraySearch)
    // console.log(page)
    // this.props.onStatus(this.state.status)

      if (status === 'pending') {
        return <div className='Spinner'><ThreeDots/></div>
    }
    
    if (status === 'pending-more') {
      return <>
        <ImageGallery listSearch={arraySearch} />
        <div className='Spinner'><ThreeDots /></div>
      </>
      }
  
    if (status === 'resolved') {
      return <>
        <ImageGallery listSearch={arraySearch} />
      </>
    }
  }
}

export default Loader;