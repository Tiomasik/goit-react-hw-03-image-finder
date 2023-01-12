// import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem'


const ImageGallery = ({ listSearch }) => (
    <ul className='ImageGallery'>
        {listSearch.map(({ id, webformatURL, tags }) =>
            <li key={id} className='ImageGalleryItem'>
                <ImageGalleryItem webformatURL={webformatURL}
                    tags={ tags } />
            </li>)}
    </ul>
)

// ImageGallery.propTypes = {
//     contacts: PropTypes.arrayOf(
//         PropTypes.exact({
//             name: PropTypes.string.isRequired,
//             id: PropTypes.string.isRequired,
//             number: PropTypes.string.isRequired,
//         })
//     ),
    
//     deleteContact: PropTypes.func.isRequired
// }

export default ImageGallery