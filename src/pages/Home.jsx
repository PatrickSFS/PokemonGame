import Form from '../components/Form';
import { useState } from 'react';
import ImgComponent from '../components/Image';
import { useNavigate } from 'react-router-dom';
import SliderComponent from '../components/Slider';

function Home() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate("");

  const handleSubmit = (path) => {
    navigate(path);
  };

  return (
    <div className="container min-h-screen bg-gradient-to-b from-neutral-900 to-zinc-900 text-white pb-8 ">
      <h2 className="text-center text-3xl font-bold pt-8">Bem-vindo à batalha de Pokémon</h2>

      <div className="container flex flex-col items-center text-center mt-8">
        {login === false ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Form login={login} setLogin={setLogin} />
          </div>
        ) : (
          <main className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
            <div className="border border-zinc-400 p-2 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <h2 className="text-xl font-semibold ">Crie seu time</h2>
              <div onClick={() => handleSubmit("/PokemonCatcher")} className="cursor-pointer ">
                <ImgComponent src="https://cdn.discordapp.com/attachments/1282830483075366964/1304109359902494860/asdasdagaewgagweg.png?ex=672e31fc&is=672ce07c&hm=45160c3a40cf8776e5fca72e3a3c0fa32fe8fa5da11de74ae1f37f6bd78ff68b&" />
              </div>
            </div>

            <div className="border border-zinc-400 p-2  rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <h2 className="text-xl font-semibold ">Veja sua pokédex</h2>
              <div onClick={() => handleSubmit("/MyPokemon")} className="cursor-pointer">
                <ImgComponent src="https://cdn.discordapp.com/attachments/1282830483075366964/1304108554973614111/4b2b1bd29c9e6d8cc1b0d77687c1cf38.jpg.png?ex=672e313c&is=672cdfbc&hm=4c7dfc96ba88d79e388e4572a736a338e0a4f273265cb09dc14094729cb97b84&" />
              </div>
            </div>

            <div className="border border-zinc-400 p-2 pb-3 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105">
              <h2 className="text-xl font-semibold ">Vá para a batalha!</h2>
              <div onClick={() => handleSubmit("/Battle")} className="cursor-pointer">
                <ImgComponent src="https://cdn.discordapp.com/attachments/1282830483075366964/1304107974024888410/998b95a06539095d676956850cc2e08e.png?ex=672e30b2&is=672cdf32&hm=787ca6b517e6264b5d842b3efa5ff51227f0030e811f1833b82f2dc4c04cd3fd&" />
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
