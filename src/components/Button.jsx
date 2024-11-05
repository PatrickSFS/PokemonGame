import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Definindo as validações de prop
ButtonComponent.propTypes = {
  href: PropTypes.string.isRequired,
  buttonName: PropTypes.string.isRequired,
};

function ButtonComponent({href, buttonName}) {
  return (
      <Link to={href}>
        <Button variant="light" >{buttonName}</Button>{' '}
      </Link>
  );
}

export default ButtonComponent;