import Card from 'react-bootstrap/Card';

// eslint-disable-next-line react/prop-types
function CardComponent({ src, name, id, types, height, weight }) {
  return (
<Card
  className="cursor-pointer text-white text-opacity-50 rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:border-2 hover:border-zinc-400 bg-[#353535] h-[460px] w-[230px]"
>
  <div className='h-[210px]'>
    <Card.Img variant="bottom" src={src}/>
  </div>
  <Card.Body className=" bg-[#222222] text-center relative">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url(${src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        width: '100%',
        transform: 'rotate(180deg) scaleX(-1)',
        opacity: 0.05,
      }}
    />
    <div className="text-center pt-2">
      <Card.Title className="font-bold border-top p-1 border-bottom border-white overflow-hidden text-ellipsis whitespace-nowrap mx-4">{name}</Card.Title>
    </div>
    <Card.Text className="text-xs flex justify-between ">
      <span className="font-bold">Number:</span> {id}
    </Card.Text>
    <Card.Text className="text-xs flex justify-between">
      <span className="font-bold">Type:</span> {types}
    </Card.Text>
    <Card.Text className="text-xs flex justify-between">
      <span className="font-bold">height:</span> {height + " m"}
    </Card.Text>
    <Card.Text className="text-xs flex justify-between">
      <span className="font-bold">weight:</span> {weight + " Kg"}
    </Card.Text>
  </Card.Body>
</Card>

  );
}
// border-2 border-zinc-400 
export default CardComponent;
