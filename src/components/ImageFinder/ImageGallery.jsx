import PropTypes from 'prop-types';

import ImageGalleryItem from './ImageGalleryItem'

const ImageGallery = ({ listSearch, choseItem }) => (
    <ul className='ImageGallery'>
        {listSearch.map(({ id, webformatURL, tags }) =>
            <li key={id} onClick={() => choseItem(id)}  className='ImageGalleryItem'>
                <ImageGalleryItem webformatURL={webformatURL}
                    tags={ tags } />
            </li>)}
    </ul>
)

ImageGallery.propTypes = {
    listSearch: PropTypes.arrayOf(
        PropTypes.object,
        PropTypes.exact({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
        }),
    ),
    choseItem: PropTypes.func.isRequired,
}

export default ImageGallery