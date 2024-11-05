import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function FormComponent({ login, setLogin }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    setLogin(true);
    console.log("Login criado com sucesso!");
  };

  return (
    <div className=" text-white p-4 rounded">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Email"
            className="bg-secondary text-white"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Senha"
            className="bg-secondary text-white"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Control
            type="password"
            placeholder="Confirme sua senha"
            className="bg-secondary text-white"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control
            type="text"
            placeholder="Nome"
            className="bg-secondary text-white"
          />
        </Form.Group>

        <Button variant="light" type="submit">
          Criar Conta
        </Button>
      </Form>
    </div>
  );
}

export default FormComponent;
