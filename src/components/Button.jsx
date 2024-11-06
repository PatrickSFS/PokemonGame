import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Definindo as validações de prop
ButtonComponent.propTypes = {
  href: PropTypes.string.isRequired,
  buttonName: PropTypes.string.isRequired,
};

// eslint-disable-next-line react/prop-types
function ButtonComponent({href, buttonName, onclick}) {
  return (
      <Link to={href}>
        <Button variant="light" onClick={onclick}>{buttonName}</Button>{' '}
      </Link>
  );
}

export default ButtonComponent;