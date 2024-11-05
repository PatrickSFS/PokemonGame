import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';


ImgComponent.propTypes = {
  src: PropTypes.string.isRequired,
};

function ImgComponent({src}) {
  return (
    <Container>
        <Col xs={60} md={60}>
          <Image src={src} rounded />
        </Col>
    </Container>
  );
}

export default ImgComponent;