import React, { Component } from 'react';



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
            console.log('Youhu!!!')
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

export default Modal;



// const Modal = ({ img }) => (
//     <div className="Overlay">
//         <div className="Modal">
//             <img src={img.largeImageURL} alt={img.tags} />
//         </div>
//     </div>
// )
// // Searchbar.propTypes = {
// //     onSubmit: PropTypes.func.isRequired,
// // }

// export default Modal;