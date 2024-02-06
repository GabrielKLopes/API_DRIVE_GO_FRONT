import React, { useState } from 'react';
import { Container, Form, Logo } from './style';
import { Button, TextField, Card, CardContent, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { RegisterUser } from '../../service/register.service';



const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [permission_id] = useState<number | undefined>(1);
  const [permissionFile_id] = useState<number | undefined>(1);
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (!username || !email || !password || !confirmPassword) {
        setRegisterError('Preencha todos os campos.');
        setTimeout(() => {
            setRegisterError('');
          }, 2500);
        return;
      }

      if (password !== confirmPassword) {
        setRegisterError('senhas diferentes.');
        setTimeout(() => {
            setRegisterError('');
          }, 2500);
        return;
      }

      const registerData = { username, email, password, permission_id, permissionFile_id };
        await RegisterUser.register(registerData);

    
        setRegisterSuccess(true);

        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
     catch (error) {
      console.error('Registro falhou:', error);
      setRegisterError('E-mail já cadastrado. Tente outro endereço de e-mail.');
      setTimeout(() => {
        setRegisterError('');
      }, 2500);
    }
  };

  const handleCloseAlert = () => {
    setRegisterError('');
  };

  return (
    <Container>
      <div className="card-container">
        <Card className="card">
          <CardContent>
            <Form className="card-form">
              <Logo>
                <img src={logo} alt="" />
              </Logo>
              <h2>Criar Conta</h2>
              <TextField
                required
                label="Nome de Usuário"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu nome de usuário"
              />
              <TextField
                required
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
              />
                <TextField
                required
                label="Senha"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
           
              />
            
              
              <TextField
                required
                label="Confirme a Senha"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme sua senha"
                type="password"
              />
              <Button
                variant="contained"
                onClick={handleRegister}
                style={{ outline: 'none' }}
              >
                Registrar
              </Button>
              {registerError && (
                <Alert severity="error" onClose={handleCloseAlert}>
                  {registerError}
                </Alert>
              )}
              {registerSuccess && (
                <Alert severity="success" onClose={() => setRegisterSuccess(false)}>
                  Cadastro realizado com sucesso! Redirecionando para o login.
                </Alert>
              )}
              <Link to="/">Já tem uma conta? Faça login aqui.</Link>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default Register;
