import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from './LoadingOverlay';

function FormComponent() {
  const navigate = useNavigate("");


  //estados para a criação da conta
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [log, setLog] = useState('');
  const [loading, setLoading] =useState(false);


  //função a criação da conta e salvar no LocalStorage
  const handleSubmit = (event, path) => {
    event.preventDefault();
  
    if (!email) {
      setLog("O email é obrigatório.");
    } else if (!password || !confirmPassword) {
      setLog("A senha e a confirmação são obrigatórias.");
    } else if (password !== confirmPassword) {
      setLog("As senhas não coincidem.");
    } else if(!name)
    {
      setLog("O Nome é Obrigátorio");
    }else {
     const profileData = { email, password, name };
      localStorage.setItem('Profile', JSON.stringify(profileData));
  
      setLog("Conta criada com sucesso!");
      setLoading(true);
  
      setTimeout(() => {
        setLoading(false);
        navigate(path); 
      }, 2000);
    }
  };

  return (
    <div>

       {/* componente de loading*/}
      {loading && <LoadingOverlay />}

      {/* componente de criar conta*/}
      <div className="text-white p-4 rounded">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              className="bg-secondary text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Senha"
              className="bg-secondary text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Control
              type="password"
              placeholder="Confirme sua senha"
              className="bg-secondary text-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="text"
              placeholder="Nome"
              className="bg-secondary text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Button variant="light" type="submit">
            Criar Conta
          </Button>
        </Form>
      </div>

      <div className='text-red-500'>{log}</div>
      
    </div>
  );
}

export default FormComponent;
