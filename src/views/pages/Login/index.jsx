import React from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Grid,
  Container,
} from '@mui/material';
import {
  useForm,
} from 'react-hook-form';
import {
  useNavigate,
} from 'react-router-dom';
import UserController from '../../../controllers/UserController';

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'passwordConfirmation') {
        if (value.password !== value.passwordConfirmation) {
          setError('passwordConfirmation');
        } else {
          clearErrors('passwordConfirmation');
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const registerUser = ({ user, password }) => {
    UserController.saveUser({ user, password });
    navigate('dashboard');
  };

  return (
    <Box className="page">
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit(registerUser)}>
              <Grid container flexDirection="column" spacing={1}>
                <Grid item>
                  <TextField
                    fullWidth
                    label="Usuário *"
                    error={!!errors.user}
                    {...register('user', { required: true })}
                    helperText={errors.user ? 'Campo obrigatório' : ''}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    label="Senha *"
                    type="password"
                    error={!!errors.password}
                    {
                      ...register(
                        'password',
                        {
                          required: true,
                          minLength: 8,
                          pattern: /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gmiy,
                        },
                      )
                    }
                    helperText={
                    errors.password
                      ? 'Formato inválido'
                      : 'Mínimo de 8 caracteres, contendo ao menos, um caracter especial, um caracter numérico, um caracter alfanumérico'
                    }
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    label="Confirmação Senha *"
                    type="password"
                    error={!!errors.passwordConfirmation}
                    {
                      ...register(
                        'passwordConfirmation',
                        {
                          required: true,
                          minLength: 8,
                          pattern: /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gmiy,
                        },
                      )
                    }
                    helperText={
                    errors.passwordConfirmation
                      ? 'Senhas diferentes'
                      : ''
                    }
                  />
                </Grid>
                <Grid item>
                  <Button variant="outlined" fullWidth type="submit">Registrar</Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Login;
