import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

class Searchbar extends Component {
  state = {
    searchName: ''
  }

  handlChange = (evt) => {
    const {value} = evt.currentTarget
    this.setState(
      {
        searchName: value.toLowerCase(),
      })
    }

  handlSubmit = (evt) => {
    evt.preventDefault()

    const {searchName} = this.state
    if (searchName.trim() === '') {
      toast.warn("Please, input something!")
      return
    }
    this.props.onSubmit(searchName.trim())
    this.resetForm()
  }
    
  resetForm = () => {
    this.setState(
    { searchName: '' })
  }

  render() {
    const {searchName} = this.state

    return (
      <header className='Searchbar'>
        <form className="SearchForm" onSubmit={this.handlSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            value={searchName}
            onChange={this.handlChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>   
    );
  }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default Searchbar;