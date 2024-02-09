

import React, { useState } from 'react';
import { AuthService } from '../../service/auth.service';

import logo from '../../assets/logo.svg';
import { Container, Form, Logo } from './style';
import { Button, TextField, Card, CardContent, Alert } from '@mui/material';
import './style.css'; 
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await AuthService.login({ email, password });
      console.log('Login successful!', user);
      
      navigate('/home');
    } catch (error) {
      console.error('Login failed!');
      setLoginError(true);
    }
  };
  const handleCloseAlert = () => {
    setLoginError(false);
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
              <h2>Bem-Vindo</h2>
              <TextField
                required
                id="outlined-required"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
              />
              <TextField
                required
                id="outlined-required"
                label="Senha"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                type="password"
              />
              <Button
                variant="contained"
                onClick={handleLogin}
                style={{ outline: 'none' }} 
              >
                Entrar
              </Button>
              {loginError && (
                <Alert severity="error" onClose={handleCloseAlert}>
                 Usuário ou Senha incorreta. Por favor, tente novamente.
                </Alert>
              )}
               <Link to="/register/user">Ainda não tem uma conta? Registre-se aqui.</Link>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default Login;
