import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handlKeyDown)
    }
    
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handlKeyDown)
    }

    handlKeyDown = evt => {
        if (evt.code === 'Escape') {
            this.props.onClose()
        }
    }

    handlOverlayClick = (evt) => {
        if (evt.target === evt.currentTarget) {
            this.props.onClose()
        }
    }

    render() {
        return  <div className="Overlay" onClick={this.handlOverlayClick}>
            <div className="Modal">
                <img src={this.props.img.largeImageURL} alt={this.props.img.tags} />
            </div>
        </div>
    }
}

Modal.propTypes = {
    img: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default Modal;

