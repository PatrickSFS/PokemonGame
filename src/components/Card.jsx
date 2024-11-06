import Card from 'react-bootstrap/Card';

// eslint-disable-next-line react/prop-types
function CardComponent({ src, name, id, types, Abilities}) {
  return (
      <Card style={{ 
        cursor: "pointer", 
        background: "none", 
        color: "white", 
        border: "3px solid black", 
        borderRadius: "2%",
        width:"232px"
      }}>
      <Card.Img variant="top" src={src} />
      <Card.Body style={{background:"#4b4a4a",height:"150px"}}>
        <div className=' flex place-content-between'>
        <Card.Title className='font-bold'>{name}</Card.Title>
        <Card.Title>{id}</Card.Title>
        </div>
        <Card.Subtitle></Card.Subtitle>
        <Card.Text className="text-xs mt-4">
          <span className='font-bold '>Type:</span> {types}
        </Card.Text>
        <Card.Text className="text-xs mt-4">
        <span className='font-bold'>Abilities:</span> {Abilities}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;
