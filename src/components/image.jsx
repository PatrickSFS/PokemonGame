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
      <Col xs={12} md={6}> {/* Ajustando para que a coluna tenha um tamanho responsivo */}
        <Image src={src} rounded fluid style={{maxWidth: '300px', maxHeight: '200px'}} /> {/* Definindo a imagem para ser pequena */}
      </Col>
    </Container>
  );
}

export default ImgComponent;
