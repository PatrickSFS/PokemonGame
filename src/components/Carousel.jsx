import Carousel from 'react-bootstrap/Carousel';

function CarouselComponent() {
  return (
    <div className='p-8'>
      <Carousel interval={null}>
        <Carousel.Item>
        <p>Lorem ipsum.</p>
        </Carousel.Item>

        <Carousel.Item>
        <p>Lorem ipsum.</p>
        </Carousel.Item>

        <Carousel.Item>
        <p>Lorem ipsum.</p>
        </Carousel.Item>

      </Carousel>
    </div>
  );
}

export default CarouselComponent;
