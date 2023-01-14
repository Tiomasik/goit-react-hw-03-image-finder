// import PropTypes from 'prop-types';


const Button = ({ loadMore }) => (
    <button type="button" onClick={loadMore} className="Button">Load more</button>
)
// Searchbar.propTypes = {
//     onSubmit: PropTypes.func.isRequired,
// }

export default Button;