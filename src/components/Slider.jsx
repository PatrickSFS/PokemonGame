import Slider from "react-slick";
import { ApiContext } from '../services/ApiContext';
import { useContext } from 'react';
import CardComponent from './Card';

function SliderComponent() {
  const { data } = useContext(ApiContext);

  // console.log('Data received from API:', data);

  const settings = {
    className: "center",
    centerMode: true, 
    infinite: true,
    centerPadding: "0px", 
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 500,
  };

  return (
    <div className="container w-[1200px] my-8">
      <Slider {...settings}>
        {data.map((pokemon) => {
          const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')
          return (
            <div key={pokemon.id} className="py-8">
              <CardComponent
                src={pokemon.sprites.front_default}
                name={pokemon.name}
                id={pokemon.id}
                types={types}
                height ={pokemon.height/10}
                weight ={pokemon.weight/10}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
export default SliderComponent;
