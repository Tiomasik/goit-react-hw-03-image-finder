import React, { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify';

import ImageGallery from './ImageGallery'
import Button from './Button'

class Loader extends Component {
  state = {
    searchInfo: null,
    status: 'idle',
    page: 1,
  }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.searchName !== this.props.searchName || prevProps.page !== this.props.page) {
            this.setState({status: 'pending'})
            fetch(`https://pixabay.com/api/?q=${this.props.searchName}&page=1&key=31299915-b383d5b151d1dc364952a6f73&image_type=photo&orientation=horizontal&per_page=12`)
              .then(response => response.json())
              .then(searchInfo => {
                if (searchInfo.hits.length !== 0) {
                  console.log(searchInfo)
                  return  this.setState({ searchInfo, status: 'resolved' })
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

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  }
  
    render() {
      const {searchInfo, status} = this.state
    
      if (status === 'pending') {
        return <div className='Spinner'><ThreeDots/></div>
      }
  
      if (status === 'resolved') {
        return <>
          <ImageGallery listSearch={searchInfo.hits} />
          <Button loadMore={this.loadMore} />
        </>
      }
  }
}

export default Loader;