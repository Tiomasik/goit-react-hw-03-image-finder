// import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, tags }) => (
    <img className="ImageGalleryItem-image" src={ webformatURL } alt={ tags }/>
)

// ContactItem.propTypes = {
//     name: PropTypes.string.isRequired,
//     number: PropTypes.string.isRequired,
//     id: PropTypes.string.isRequired,
//     deleteContact: PropTypes.func.isRequired
// }

export default ImageGalleryItem