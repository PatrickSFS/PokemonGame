import Form from '../components/Form';
import ImgComponent from "../components/ImgComponent";
import { useNavigate } from 'react-router-dom';
import SliderComponent from '../components/Slider';


function Home() {
  const navigate = useNavigate("");

  const handleSubmit = (path) => {
    navigate(path);
  };



const loginVerification = () => {
  const profile = localStorage.getItem('Profile');
  return profile !== null;
};

  return (
    <div className="container min-h-screen bg-gradient-to-b from-neutral-900 to-zinc-900 text-white pb-8 ">
      <h2 className="text-center text-3xl font-bold pt-8">Bem-vindo à batalha de Pokémon</h2>

      <div className="container flex flex-col items-center text-center mt-8">
        {loginVerification() === false ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Form />

          </div>
        ) : (
          <main className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
            <div className="border border-zinc-400 p-2 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <h2 className="text-xl font-semibold ">Crie seu time</h2>
              <div onClick={() => handleSubmit("/PokemonCatcher")} className="cursor-pointer ">
                <ImgComponent src="https://r2.fivemanage.com/yE4TzQKufp5XXhY24A9bl/asdasdagaewgagweg.png" />
              </div>
            </div>

            <div className="border border-zinc-400 p-2  rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <h2 className="text-xl font-semibold ">Veja sua pokédex</h2>
              <div onClick={() => handleSubmit("/MyPokemon")} className="cursor-pointer">
                <ImgComponent src="https://r2.fivemanage.com/yE4TzQKufp5XXhY24A9bl/4b2b1bd29c9e6d8cc1b0d77687c1cf38.jpg.png" />
              </div>
            </div>

            <div className="border border-zinc-400 p-2 pb-3 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <h2 className="text-xl font-semibold ">Vá para a batalha!</h2>
              <div onClick={() => handleSubmit("/Battle")} className="cursor-pointer">
                <ImgComponent src="https://r2.fivemanage.com/yE4TzQKufp5XXhY24A9bl/998b95a06539095d676956850cc2e08e.png" />
              </div>
            </div>
          </main>
        )}
      </div>

      <h2 className="mt-8 text-center text-2xl font-semibold">Alguns pokémons</h2>
      <SliderComponent/>
    </div>
  );
}

export default Home;
