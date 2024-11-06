import Card from 'react-bootstrap/Card';

// eslint-disable-next-line react/prop-types
function CardStatus({ src, name, id, types, hp, attack, defense, specialAttack, specialDefense, speed }) {

  return (
    <Card
      style={{
        cursor: 'pointer',
        background: 'none',
        color: 'white',
        border: '3px solid black',
        borderRadius: '2%',
        width: '232px',
      }}
    >
      <Card.Img variant="top" src={src} />
      <Card.Body style={{ background: '#4b4a4a', height: 'auto' }}>
        <div className="flex place-content-between">
          <Card.Title className="font-bold">{name}</Card.Title>
          <Card.Title>{id}</Card.Title>
        </div>
        <Card.Text className="text-xs mt-2">
          <span className="font-bold">Type:</span> {types}
        </Card.Text>
        <Card.Text className="text-xs mt-4">
          <span className="font-bold">Stats:</span>
          <ul>
            <li>
              <strong>HP:</strong> {hp || 'N/A'}
            </li>
            <li>
              <strong>Attack:</strong> {attack || 'N/A'}
            </li>
            <li>
              <strong>Defense:</strong> {defense || 'N/A'}
            </li>
            <li>
              <strong>Special Attack:</strong>{' '}
              {specialAttack || 'N/A'}
            </li>
            <li>
              <strong>Special Defense:</strong>{' '}
              {specialDefense || 'N/A'}
            </li>
            <li>
              <strong>Speed:</strong> {speed || 'N/A'}
            </li>
          </ul>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardStatus;
