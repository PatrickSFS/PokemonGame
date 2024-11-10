import Card from 'react-bootstrap/Card';

// eslint-disable-next-line react/prop-types
function CardStatus({ src, name, id, types, hp, attack, defense, specialAttack, specialDefense, speed }) {
  return (
    <Card
      className="cursor-pointer text-white text-opacity-50 rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:border-2 hover:border-zinc-400 bg-[#353535] h-[432px] w-[230px]"
    >
      <div className="h-[210px]">
        <Card.Img variant="top" src={src} className="w-full h-full object-cover" />
      </div>
      <Card.Body className="bg-[#222222] text-center relative">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'rotate(180deg) scaleX(-1)',
            opacity: 0.05,
          }}
        />
        <div className="">
          <Card.Title className="font-bold border-top p-1 border-bottom border-white overflow-hidden text-ellipsis whitespace-nowrap mx-4">{name}</Card.Title>

        </div>
        <Card.Text className="text-xs flex justify-between ">
          <span className="font-bold">Number:</span> {id}
        </Card.Text>
        <Card.Text className="text-xs flex justify-between">
          <span className="font-bold">Type:</span> {types}
        </Card.Text>
        <Card.Text className="text-xs ">
          <span className="font-bold">Stats:</span>
          <ul className=" text-left grid g">
            <li><strong>HP:</strong> {hp || 'N/A'}</li>
            <li><strong>Attack:</strong> {attack || 'N/A'}</li>
            <li><strong>Defense:</strong> {defense || 'N/A'}</li>
            <li><strong>Special Attack:</strong> {specialAttack || 'N/A'}</li>
            <li><strong>Special Defense:</strong> {specialDefense || 'N/A'}</li>
            <li><strong>Speed:</strong> {speed || 'N/A'}</li>
          </ul>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardStatus;
