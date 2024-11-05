import Form from '../components/Form';
import { useState } from 'react';
import ImgComponent from '../components/Image';
import { useNavigate } from 'react-router-dom'; 
import CarouselComponent from '../components/Carousel';

function Home() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate(""); 

  const handleSubmit = (path) => {
    navigate(path);
  };

  return (
    <div className='container min-h-[90vh]'>
      <h2 className=' justify-center items-center flex p-4'>Bem-vindo à batalha de Pokemon</h2>

      <div className='container flex flex-col justify-center items-center text-center'>
        {login === false ? (
          <Form login={login} setLogin={setLogin} />
        ) : (
          <main className='grid grid-cols-2'>

            <div>
            <h2 className='my-2'>Crie um time de até 5 pokémons</h2>
            <div onClick={() => handleSubmit("/PokemonCatcher")} className='cursor-pointer'>
            
              <ImgComponent src="https://cdn.discordapp.com/attachments/1282830483075366964/1302970291953340446/FundoCard.png?ex=672a0d25&is=6728bba5&hm=5eead32f517c55f2398d97138819062fcd4d98040d4532140a88f492f1718829&"/>
            </div>
            </div>

            <div>
            <h2 className='my-2'>Veja sua pokédex</h2>
            <div onClick={() => handleSubmit("/MyPokemon")} className='cursor-pointer'>
              <ImgComponent src="https://cdn.discordapp.com/attachments/1282830483075366964/1302970291953340446/FundoCard.png?ex=672a0d25&is=6728bba5&hm=5eead32f517c55f2398d97138819062fcd4d98040d4532140a88f492f1718829&"/>
            </div>
            </div>

            <div>
            <h2 className='my-2'>Vá para a batalha e consiga novos pokémons</h2>
            <div onClick={() => handleSubmit("/Battle")} className='cursor-pointer'>
              <ImgComponent src="https://cdn.discordapp.com/attachments/1282830483075366964/1302970291953340446/FundoCard.png?ex=672a0d25&is=6728bba5&hm=5eead32f517c55f2398d97138819062fcd4d98040d4532140a88f492f1718829&"/>
            </div>
            </div>

          </main>
        )}

        <CarouselComponent />

      </div>

    </div>
  );
}

export default Home;