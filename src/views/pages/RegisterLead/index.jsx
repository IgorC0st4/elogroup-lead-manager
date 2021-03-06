import React from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Grid,
  Container,
  Paper,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import {
  useForm,
  Controller,
} from 'react-hook-form';

import LeadController from '../../../controllers/LeadController';

const oportunities = [
  'RPA',
  'Produto Digital',
  'Analytitcs',
  'BPM',
];

const defaultCheckboxGroupCheckedStates = {
  RPA: false,
  'Produto Digital': false,
  Analytitcs: false,
  BPM: false,
};

function RegisterLead() {
  const [
    checkboxGroupCheckedStates,
    setCheckboxGroupCheckedStates,
  ] = React.useState(defaultCheckboxGroupCheckedStates);
  const [
    showOportunityError,
    setShowOportunityError,
  ] = React.useState(false);
  const [
    showSuccessMessage,
    setShowSuccessMessage,
  ] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  const validateCheckboxGroup = (group) => {
    const values = Object.values(group);
    return values.indexOf(true) !== -1;
  };

  const checkOportunity = (oportunity) => {
    const temp = checkboxGroupCheckedStates;
    temp[oportunity] = !checkboxGroupCheckedStates[oportunity];
    setCheckboxGroupCheckedStates(temp);
  };

  const registerLead = (data) => {
    const {
      email, name, telephone, ...checkboxGroup
    } = data;
    if (validateCheckboxGroup(checkboxGroup)) {
      setShowOportunityError(false);
      LeadController.saveLead({
        email,
        name,
        telephone,
        oportunities: checkboxGroup,
        status: 'Cliente em Potencial',
      });
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } else {
      setShowOportunityError(true);
    }
  };

  const toggleAllOptions = (event) => {
    const updatedCheckedStates = {};
    oportunities.forEach((oportunity) => {
      setValue(oportunity, event.target.checked);
      updatedCheckedStates[oportunity] = event.target.checked;
    });
    setCheckboxGroupCheckedStates(updatedCheckedStates);
  };

  return (
    <Box className="page">
      <Container maxWidth="lg">
        <Card>
          <CardContent>
            <Grid container flexDirection="column" spacing={1}>
              <Grid item>
                <Grid
                  container
                  flexDirection="row"
                  justifyContent="center"
                  justifyItems="center"
                  alignContent="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <img
                      alt="elogroup logo"
                      src="https://elogroup.com.br/wp-content/uploads/2021/08/Logo-2.svg"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Typography variant="h4" component="div">Novo Lead</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <form onSubmit={handleSubmit(registerLead)}>
                  <Grid container flexDirection="row" spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Grid container flexDirection="column" spacing={1}>
                        <Grid item>
                          <TextField
                            fullWidth
                            label="Nome *"
                            error={!!errors.name}
                            {...register('name', { required: true })}
                            helperText={errors.name ? 'Campo obrigat??rio' : ''}
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            fullWidth
                            label="Telefone *"
                            type="tel"
                            error={!!errors.telephone}
                            {
                      ...register(
                        'telephone',
                        {
                          required: true,
                          minLength: 10,
                          maxLength: 12,
                          pattern: /^(?=.*?[0-9]).{10,12}$/gmiy,
                        },
                      )
                    }
                            helperText={
                    errors.password
                      ? 'Formato inv??lido'
                      : 'Entre apenas n??meros. M??nimo 10 d??gitos (incluindo DDD)'
                    }
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            fullWidth
                            label="Email *"
                            type="email"
                            error={!!errors.email}
                            {
                      ...register(
                        'email',
                        {
                          required: true,
                          minLength: 3,
                          pattern: /^(?=.*?[@]).{3,}$/gmiy,
                        },
                      )
                    }
                            helperText={
                          errors.email
                            ? 'Campo inv??lido'
                            : ''
                    }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Grid container flexDirection="column" spacing={1}>
                        <Grid item>
                          <Paper>
                            <Grid container flexDirection="column" spacing={1} paddingLeft={1}>
                              <Grid item>
                                <Typography variant="body1" gutterBottom component="div">
                                  Oportunidades *
                                </Typography>
                              </Grid>
                              {
                            showOportunityError && (
                              <Grid item>
                                <Typography variant="body2" gutterBottom component="div" color="red">
                                  Escolha ao menos uma das op????es
                                </Typography>
                              </Grid>
                            )
                          }
                              <Grid item>
                                <FormControlLabel
                                  control={<Checkbox onChange={toggleAllOptions} />}
                                />
                              </Grid>
                              {
                          oportunities.map((oportunity, index) => (
                            <Controller
                              key={index.toString()}
                              name={oportunity}
                              control={control}
                              render={({ field }) => (
                                <Grid item>
                                  <FormControlLabel
                                    key={index.toString()}
                                    onClick={() => checkOportunity(oportunity)}
                                    control={(
                                      <Checkbox
                                        checked={checkboxGroupCheckedStates[oportunity]}
                                        {...field}
                                      />
                                    )}
                                    label={oportunity}
                                  />
                                </Grid>
                              )}
                            />
                          ))
                        }
                            </Grid>

                            {
                            showSuccessMessage && (
                              <Grid item>
                                <Typography variant="body2" gutterBottom component="div" color="green">
                                  Lead salva com sucesso
                                </Typography>
                              </Grid>
                            )
                          }
                          </Paper>
                        </Grid>
                        <Grid item>
                          <Button variant="contained" fullWidth type="submit">Registrar</Button>
                        </Grid>
                      </Grid>
                    </Grid>

                  </Grid>
                </form>
              </Grid>
            </Grid>

          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default RegisterLead;
